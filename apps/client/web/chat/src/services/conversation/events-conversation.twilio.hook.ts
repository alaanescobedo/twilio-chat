import { showNotification } from "@mantine/notifications"
import { useContext } from "react"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"

export const useEventsConversation = () => {
  const { client, setConversations, setIsLoading, listenedEvents, setListenedEvents } = useContext(ConversationContext)

  const onListenConversations = () => {
    if (!client || listenedEvents === true) return
    setListenedEvents(true)

    client.on('conversationJoined', (conversation) => {
      console.log('joined')
      console.log({ conversation })
      setIsLoading(true)
      setConversations((prev) => [...prev, conversation])
      setIsLoading(false)
    })
    client.on('conversationAdded', (conversation) => {
      console.log('added')
      setIsLoading(true)
      setIsLoading(false)
    })
    client.on('conversationLeft', (conversation) => {
      console.log('left')
      setIsLoading(true)
      setConversations((prev) => prev.filter(chat => chat.sid !== conversation.sid))
      setIsLoading(false)
    })
    client.on('conversationRemoved', (conversation) => {
      console.log('remove', { conversation })
      // console.log('removed')
      setIsLoading(true)
      setConversations((prev) => prev.filter(chat => chat.sid !== conversation.sid))
      setIsLoading(false)
    })
    client.on('conversationUpdated', ({ conversation, updateReasons }) => {
      // console.log('updated')
      console.log({ updateReasons })
      setIsLoading(true)
      setConversations((prev) => prev.map((chat) => chat.sid === conversation.sid ? conversation : chat))
      setIsLoading(false)
    })
    client.on('connectionError', (error) => {
      console.log({ error })
      showNotification({
        color: 'red',
        message: error.message ?? 'Ups! Something went wrong',
      })
    })
  }

  return {
    onListenConversations,
    listenedEvents
  }
}
