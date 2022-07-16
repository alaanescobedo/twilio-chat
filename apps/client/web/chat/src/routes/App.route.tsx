import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/Login.page"
import MePage from "../pages/conversations/Me.page"
import { MessageRoomProvider } from "../store/conversation/message-room.twilio.provider"
import { ParticipantRoomProvider } from "../store/conversation/participant-room.twilio.provider"
import BlockIfIsAuth from "./BlockIfIsAuth.route"
import RequireAuth from "./RequireAuth.route"
import RequireConversationRoom from "./RequireConversationRoom"

export const AppRoute = () => {

  return (
    <Routes>
      <Route path='/auth' element={<BlockIfIsAuth />}>
        <Route path='login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to='/auth/login' replace />} />
      </Route>

      <Route path="/conversations" element={<RequireAuth />}>
        <Route path='me' element={<MePage />} />I
        <Route path=':conversationId' element={
          <ParticipantRoomProvider>
            <MessageRoomProvider>
              <RequireConversationRoom />
            </MessageRoomProvider>
          </ParticipantRoomProvider>
        } />
      </Route>
      <Route path="*" element={<Navigate to='/conversations/me' replace />} />
    </Routes >
  )
}

export default AppRoute