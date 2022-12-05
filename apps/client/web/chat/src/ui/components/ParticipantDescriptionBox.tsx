import { createStyles, Avatar, Text, Group, Button, TextInput, Box, Paper, Stack, Badge } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Participant } from '@twilio/conversations';
import conversationTwilioService from '../../services/conversation/conversation.twilio.service';
import messageTwilioService from '../../services/conversation/message.twilio.service';

import participantTwilioService from '../../services/conversation/participant.twilio.service';
import { useConversation } from '../../store/conversation/conversation.twilio.context';
import { useParticipants } from '../../store/conversation/participant-room.twilio.context';
import { useUser } from '../../store/user/user.context';
import { RenderIf } from './RenderIf';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

interface UserDescriptionBoxProps {
  participant: Participant
}
export const ParticipantDescriptionBox = ({ participant }: UserDescriptionBoxProps) => {
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      message: '',
    }
  })

  const { activeConversation, roles, client } = useConversation()
  const { me } = useParticipants()
  const { user } = useUser()

  const handleExpulseParticipant = async () => {
    await participantTwilioService.remove({ conversation: activeConversation, participant })
  }

  const handleGiveChannelAdmin = async () => {
    if (!activeConversation) return

    await participantTwilioService.giveChannelAdminRole({
      channelId: activeConversation.sid,
      participantSid: participant.sid
    })
  }

  const handleRevokeChannelAdmin = async () => {
    if (!activeConversation) return

    await participantTwilioService.revokeChannelAdminRole({
      channelId: activeConversation.sid,
      participantSid: participant.sid
    })
  }

  const handleSendIndividualMessage = async (message: string) => {
    console.log({ message })
    const conversation = await conversationTwilioService.conversationFactory({
      client,
      room: me?.identity || user?.friendlyName || user?.identity!,
      method: 'create'
    })
    await conversation.join()
    await conversation.add(participant.identity!)

    messageTwilioService.send({
      conversation,
      to: participant.identity!,
      text: message
    })

  }

  return (
    <Paper radius="xs" className={classes.card} sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.white,
    })}>
      <Stack p='sm'>
        <Avatar src={null} size={80} radius={80} mx="auto" className={classes.avatar} />
        <Text align="center" size="lg" weight={500}>
          {null}
        </Text>
        <Group direction='column' spacing={0}>
          <Text weight='bold' size='sm' p={0}>
            About Me
          </Text>
          <Text weight='lighter' size='sm'>
            I like champurrado
          </Text>
        </Group>
        <Group spacing='xs'>
          <Badge color="gray" radius="lg" variant="dot">{roles[participant.roleSid]}</Badge>
        </Group>

        <RenderIf condition={participant.sid !== me!.sid}>
          <form onSubmit={form.onSubmit(({ message }) => handleSendIndividualMessage(message))}>
            <TextInput
              placeholder={`Send a message to ${participant.identity}`}
              {...form.getInputProps('message')}
            />
          </form>
        </RenderIf>
        <RenderIf condition={me && participant.sid !== me.sid ? true : false} >
          <Group >
            <RenderIf condition={roles[participant.roleSid] !== 'channel admin' && roles[user?.serviceSid!] !== 'service admin'} >
              <Button color='cyan' variant='outline' onClick={handleGiveChannelAdmin}>Give Admin</Button>
            </RenderIf>
            <RenderIf condition={roles[participant.roleSid] === 'channel admin'}>
              <Button size='sm' color='cyan' variant='outline' onClick={handleRevokeChannelAdmin}>
                <Text size='xs'>Revoke Admin</Text>
              </Button>
            </RenderIf>
            <Button size='sm' color='red' variant='outline' onClick={handleExpulseParticipant}>
              <Text size='xs'>Expulse User</Text>
            </Button>
          </Group>
        </RenderIf>
      </Stack>
    </Paper >
  )
}