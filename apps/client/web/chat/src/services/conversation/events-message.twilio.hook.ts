import { useContext } from "react"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"
import { MessageRoomContext } from "../../store/conversation/message-room.twilio.context"

export const useEventsMessage = () => {
  const { activeConversation: conversation } = useContext(ConversationContext)
  const { setMessages, setIsLoading } = useContext(MessageRoomContext)


  const onListenMessages = async () => {
    if (!conversation) return

    conversation.on('messageAdded', async (message) => {
      setIsLoading(true)
      setMessages((prev) => [...prev, message])
      setIsLoading(false)
    })
    conversation.on('messageRemoved', (message) => {
      setIsLoading(true)
      setMessages((prev) => prev.filter(m => m.sid !== message.sid))
      setIsLoading(false)
    })
    conversation.on('messageUpdated', ({ message, updateReasons }) => {
      setIsLoading(true)
      // setMessages((prev) => prev.map((m) => m.sid === message.sid ? message : m))
      setIsLoading(false)
    })
  }


  return {
    onListenMessages
  }
}
