import { showNotification } from "@mantine/notifications"
import { useContext, useEffect, useRef, useState } from "react"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"
import { MessageRoomContext } from "../../store/conversation/message-room.twilio.context"
import { ParticipantsRoomContext } from "../../store/conversation/participant-room.twilio.context"
import { useUser } from "../../store/user/user.context"


export const useBootstrapConversationRoom = (conversationId: string) => {
  const { client, setActiveConversation } = useContext(ConversationContext)
  const { setMessages } = useContext(MessageRoomContext)
  const { setParticipants, setMe } = useContext(ParticipantsRoomContext)
  const [done, setDone] = useState(false)
  const { user } = useUser()

  const bootstrap = async () => {
    try {
      if (!conversationId) throw new Error('ConversationId not found')
      setDone(false)

      const conversation = await client?.getConversationBySid(conversationId)
      if (!conversation) throw new Error('Conversation not found')

      const messagesPaginator = await conversation.getMessages()
      const messages = messagesPaginator.items.flatMap(message => message)

      const participants = await conversation.getParticipants()
      const me = participants.find(participant => participant.identity === user?.identity)

      setMessages(messages)
      setParticipants(participants)
      if (me) setMe(me)
      setActiveConversation(conversation)
      setDone(true)
    } catch (error: any) {
      // devDebugger('bootstrap-room', { error })
      setDone(true)
      showNotification({ message: error?.body?.message ?? error.message ?? 'Ups', color: 'red' })
      throw error
    }
  }

  return {
    bootstrap,
    done
  }
}