import { Avatar, createStyles, Text, UnstyledButton } from '@mantine/core'
import { Participant } from '@twilio/conversations';

const useStyles = createStyles((theme) => ({
  user: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
    '&:focus': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[0],
    }
  },
}));

interface ParticipantBoxProps {
  participant: Participant;
  onClick?: () => void;
}
export const ParticipantBox = ({ participant, onClick }: ParticipantBoxProps) => {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.user} onClick={onClick} >
      <Avatar src={null} alt="it's me" radius='xl' color='cyan' />
      <Text>{participant.identity}</Text>
    </UnstyledButton>
  )
}
