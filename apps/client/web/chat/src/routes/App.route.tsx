import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "../pages/auth/Login.page"
import ConversationPage from "../pages/conversations/Conversation.page"
import MePage from "../pages/conversations/Me.page"
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
      <Route path="/conversations" element={
        <RequireAuth />
      }>
        <Route path='me' element={
          <MePage />
        } />I
        <Route path=':conversationId' element={
          <RequireConversationRoom >
            <ConversationPage />
          </RequireConversationRoom>
        } />
      </Route>

      <Route path="*" element={<Navigate to='/conversations/me' replace />} />
    </Routes >
  )
}

export default AppRoute