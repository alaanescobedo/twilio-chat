import { showNotification } from "@mantine/notifications"
import { useContext } from "react"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"

export const useEventsConversation = () => {
  const { client, setConversations, setIsLoading, listenedRooms, setListenedRooms } = useContext(ConversationContext)

  const onListenConversations = () => {
    console.log(listenedRooms.includes('app'))
    if (!client) return
    if (listenedRooms.includes('app')) return
    setListenedRooms(prev => [...prev, 'app'])
    console.log('listen app')

    client.on('conversationJoined', (conversation) => {
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
    client.on('typingStarted', (conversation) => {
      console.log('typingStarted')
      console.log({ conversation })
    })
  }

  return {
    onListenConversations
  }
}
