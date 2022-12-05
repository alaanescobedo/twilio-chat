import { useConversation } from "../../store/conversation/conversation.twilio.context"
import { ChatDetailsContainer } from "../../ui/containers/chat-panels/ChatDetails.container"
import { ChatRoomsContainer } from "../../ui/containers/chat-panels/ChatRooms.container"
import { ConversationChatLayout } from "../../ui/layouts/ConversationChat.layout"

const MePage = () => {

  const { identity } = useConversation()

  return (
    <ConversationChatLayout
      mainPanel={<div />}
      panelLeft={<ChatRoomsContainer />}
      panelTop={<ChatDetailsContainer chatName={`${identity}`} />}
      panelRight={<div />}
    />
  )
}

export default MePage