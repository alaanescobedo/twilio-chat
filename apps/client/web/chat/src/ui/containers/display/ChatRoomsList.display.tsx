import { Conversation } from '@twilio/conversations'
import { RoomBox } from '../../components/RoomBox'
import ScrollList from './ScrollList'

interface ChatRoomsListDisplayProps {
  conversations: Conversation[]
}
export const ChatRoomsListDisplay = ({ conversations }: ChatRoomsListDisplayProps) => {

  const rooms = conversations.map((conversation, i) => (
    <RoomBox key={i} room={conversation} attributes={JSON.parse(JSON.stringify(conversation.attributes))} />
  ))

  return (
    <ScrollList>
      {rooms}
    </ScrollList>
  )
}

