import { LoadingOverlay } from "@mantine/core"
import { useEffect, useState } from "react"
import { Navigate, useLocation, useParams } from "react-router-dom"
import { useBootstrapConversationRoom } from "../services/bootstrap/boostrap.conversation"
import { useConversation } from "../store/conversation/conversation.twilio.context"

const RequireConversationRoom = ({ children }: { children: JSX.Element }) => {
  const { conversationId } = useParams()

  const { client, activeConversation: conversation } = useConversation()
  const { bootstrap } = useBootstrapConversationRoom(conversationId ?? '')

  const [isFail, setIsFail] = useState(false)

  useEffect(() => {
    if (!conversationId) return setIsFail(true)
    if (client === null) return
    bootstrap()
      .catch(() => setIsFail(true))

  }, [client, conversationId])

  if (isFail === true || !conversationId) return <Navigate to='/conversations/me' />
  if (client === null || conversation === null) return <LoadingOverlay visible={true} />

  return children
}

export default RequireConversationRoom