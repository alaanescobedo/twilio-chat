import { ChatDetailsContainer } from "../../ui/containers/chat-panels/ChatDetails.container"
import { ChatMessagesContainer } from "../../ui/containers/chat-panels/ChatMessages.container"
import { ChatRoomsContainer } from "../../ui/containers/chat-panels/ChatRooms.container"
import { ChatParticipantsListContainer } from "../../ui/containers/chat-panels/ChatParticipantsList.container"
import { ConversationChatLayout } from "../../ui/layouts/ConversationChat.layout"
import { useConversation } from "../../store/conversation/conversation.twilio.context"

const ConversationPage = () => {

  const { activeConversation } = useConversation()

  return (
    <ConversationChatLayout
      mainPanel={<ChatMessagesContainer />}
      panelLeft={<ChatRoomsContainer />}
      panelRight={<ChatParticipantsListContainer />}
      panelTop={<ChatDetailsContainer chatName={
        activeConversation?.friendlyName ?? activeConversation?.uniqueName!
      } />}
    />
  )
}

export default ConversationPage