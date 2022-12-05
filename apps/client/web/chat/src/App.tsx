import { MantineProvider } from "@mantine/core"
import { NotificationsProvider } from "@mantine/notifications"
import { BrowserRouter } from "react-router-dom"
import AppRoute from "./routes/App.route"
  import { ConversationProvider } from "./store/conversation/conversation.twilio.provider"
import { MessageRoomProvider } from "./store/conversation/message-room.twilio.provider"
import { ParticipantRoomProvider } from "./store/conversation/participant-room.twilio.provider"
import { UserProvider } from "./store/user/user.provider"

function App() {

  // TODO: Refactor providers to work only in the conversation route, ChatLayoutComponent and RequireConversationRoom needs to be refactored.
  // TODO: Implement useReducer to manage state.
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <BrowserRouter>
          <UserProvider>
      {/* // TODO: Reduce quantity of contexts and providers. */}
            <ConversationProvider>
              <ParticipantRoomProvider>
                <MessageRoomProvider>
                  <AppRoute />
                </MessageRoomProvider>
              </ParticipantRoomProvider>
            </ConversationProvider>
          </UserProvider>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider >
  )
}

export default App
