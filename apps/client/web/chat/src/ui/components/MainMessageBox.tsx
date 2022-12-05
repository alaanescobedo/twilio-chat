import { Avatar, Grid, Group, Text } from "@mantine/core"
import { Message } from "@twilio/conversations"
import { useBreakpoint } from "../../utils/breakpoint.hook"
import { formatMessageDate } from "../../utils/format-message-date"
import { RenderIf } from "./RenderIf"

interface MessageBoxProps {
  message: Message
  onMouseEnter: () => void
  onMouseLeave: () => void
}
export const MainMessageBox = ({ message, onMouseEnter, onMouseLeave }: MessageBoxProps) => {

  const breakpoint = useBreakpoint()
  const matchXS = breakpoint >= 576

  return (

    <Grid onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave} columns={12} m={0}>
      <RenderIf condition={matchXS}>
        <Grid.Col span={1} m='auto 0' sx={{ textAlign: 'right' }}>
          <Avatar src={null} alt="it's me" radius='xl' color='cyan' m='0 auto' />
        </Grid.Col>
      </RenderIf>

      <Grid.Col span={matchXS ? 11 : 12} px={matchXS ? undefined : 'lg'} >
        <Group spacing='xs' align='flex-end'>
          <Text component='span' weight='bold'>{message.author}</Text>
          <Text component='span' weight='lighter' size='xs' align="right">{formatMessageDate(message.dateCreated)}</Text>
        </Group>
        <Text component="p" m={0} sx={{ wordBreak: 'break-word', lineHeight: '1.2' }}>
          {message.body}
        </Text>
      </Grid.Col>
    </Grid >
  )
}
