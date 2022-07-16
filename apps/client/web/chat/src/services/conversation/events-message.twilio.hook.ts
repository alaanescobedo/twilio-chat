import { useContext } from "react"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"
import { MessageRoomContext } from "../../store/conversation/message-room.twilio.context"

export const useEventsMessage = () => {
  const { client, activeConversation: conversation } = useContext(ConversationContext)
  const { setMessages, setIsLoading, listenedEvents, setListenedEvents } = useContext(MessageRoomContext)

  const onListenMessages = async () => {
    console.log({ client, listenedEvents, conversation })
    if (client === null || listenedEvents === true || conversation === null) return
    setListenedEvents(true)
    console.log('Listening to messages')

    conversation.on('messageAdded', async (message) => {
      console.log('messageAdded', { message })
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
    onListenMessages,
    listenedEvents
  }
}
