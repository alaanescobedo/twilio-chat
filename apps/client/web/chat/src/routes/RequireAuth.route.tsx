import { LoadingOverlay } from "@mantine/core"
import { useEffect, useRef, } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useBootstrapApp } from "../services/bootstrap/bootstrap.app"
import { useConversation } from "../store/conversation/conversation.twilio.context"

const RequireAuth = () => {

  const { bootstrap, done } = useBootstrapApp()
  const { identity } = useConversation()

  const effectRan = useRef(false)

  useEffect(() => {
    if (effectRan.current === true) return
    bootstrap()
    return () => { effectRan.current = true }
  }, [])

  if (!identity) return <Navigate to='/auth/login' />
  if (done === false) return <LoadingOverlay visible={true} />
  return <Outlet />
}

export default RequireAuth