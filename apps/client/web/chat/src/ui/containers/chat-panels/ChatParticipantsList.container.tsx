import { Box } from "@mantine/core"
import { useParticipants } from "../../../store/conversation/participant-room.twilio.context"
import { ChatParticipantsListDisplay } from "../display/ChatParticipantsList.display"

export const ChatParticipantsListContainer = () => {
  const { participants } = useParticipants()

  return (
    <>
      <Box py='md' px={0} sx={(theme) => ({
        flex: '1',
        height: '100%',
        backgroundColor: theme.colors.gray[9],
        borderRadius: 'md'
      })}>
        <ChatParticipantsListDisplay participants={participants} />
      </Box>
    </>
  )
}
