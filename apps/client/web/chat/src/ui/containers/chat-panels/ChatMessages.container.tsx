import { Box, Paper, Space } from "@mantine/core"
import { ChatMessagesListDisplay } from "../display/ChatMessagesList.display"
import { InputChatMessages } from "../forms/ChatMessages.form"
import { useBreakpoint } from "../../../utils/breakpoint.hook";
import { useMessages } from "../../../store/conversation/message-room.twilio.context";
import { useConversation } from "../../../store/conversation/conversation.twilio.context";
import messageService from "../../../services/conversation/message.twilio.service";

export const ChatMessagesContainer = () => {
  const breakpoint = useBreakpoint()

  const { messages } = useMessages()
  const { activeConversation, identity } = useConversation()

  const handleSubmitMessage = async (message: string) => {
    await messageService.send({
      text: message,
      conversation: activeConversation,
      to: identity
    })
  } 

  return (
    <>
      <Box sx={(theme) => ({
        flex: '1',
        backgroundColor: theme.colors.gray[9],
        borderRadius: 'md',
        padding: breakpoint <= theme.breakpoints.sm ? theme.spacing.xs : theme.spacing.lg,
      })}>
        <Paper sx={(theme) => ({
          flex: '1',
          height: '100%',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.white
        })}>
          <ChatMessagesListDisplay messages={messages} />
        </Paper>
      </Box>
      <InputChatMessages onSendMessage={handleSubmitMessage} />
      <Space />
    </>
  )
}
