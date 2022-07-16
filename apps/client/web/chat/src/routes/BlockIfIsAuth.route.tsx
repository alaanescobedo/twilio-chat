import { Navigate, Outlet } from "react-router-dom"
import { useConversation } from "../store/conversation/conversation.twilio.context"

const BlockIfIsAuth = () => {
  const { identity } = useConversation()

  if (identity) return <Navigate to='/conversations/me' state={{ from: location }} />

  return <Outlet />
}

export default BlockIfIsAuth