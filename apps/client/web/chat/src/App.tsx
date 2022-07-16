import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { BrowserRouter } from "react-router-dom"
import AppRoute from "./routes/App.route"
import { ConversationProvider } from "./store/conversation/conversation.twilio.provider"
import { UserProvider } from "./store/user/user.provider"

function App() {

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <BrowserRouter>
          <UserProvider>
            <ConversationProvider>
              <AppRoute />
            </ConversationProvider>
          </UserProvider>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
