import { Grid, Text } from "@mantine/core"
import { Message } from "@twilio/conversations"
import { getTime } from "../../utils/format-message-date"

interface MessageBoxProps {
  message: Message
  onMouseEnter: () => void
  onMouseLeave: () => void
}
export const MessageBox = ({ message, onMouseEnter, onMouseLeave }: MessageBoxProps) => {
  return (

    <Grid
      onMouseOver={onMouseEnter}
      onMouseLeave={onMouseLeave}
      columns={12}
      m={0}
      px={0}
      py='xs'
      sx={() => ({
        alignItems: 'center',

        '&:hover': {
          '.text-hour': {
            opacity: '1',
            transition: 'opacity .2s ease',
          }
        }
      })}>
      <Grid.Col span={1} m='auto 0' sx={{ textAlign: 'right' }} py={0} px={0}>
        <Text component="span" size='xs' weight='lighter' sx={{ opacity: '0', transition: 'opacity .2s ease' }} className='text-hour'>
          {getTime(message.dateCreated)}
        </Text>
      </Grid.Col>
      <Grid.Col span={11} py={0} pr='xs'> 
        <Text component="p" m={0} sx={{ wordBreak: 'break-word', lineHeight: '1.2' }}>
          {message.body}
        </Text>
      </Grid.Col>
    </Grid>
  )
}
