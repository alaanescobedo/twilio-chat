import { Box, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import React from "react"
import { useParticipants } from "../../../store/conversation/participant-room.twilio.context"

interface InputChatMessagesProps {
  onSendMessage: (message: string) => Promise<void>

}
export const InputChatMessages = ({ onSendMessage }: InputChatMessagesProps) => {

  const form = useForm({
    initialValues: {
      message: ""
    }
  })
  const { me } = useParticipants()


  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    me?.emit("typingStarted", me)
    const { message } = form.values
    if (!message.trim() && e.key === 'Enter') e.preventDefault()

    form.setValues({ message: e.currentTarget.value })
    if (e.key !== 'Enter') return
    if (form.values.message.length === 0) return
    e.preventDefault()

    await onSendMessage(form.values.message)
    form.reset()
  }

  return (
    <Box>
      <Textarea
        p={2}
        rows={1}
        {...form.getInputProps('message')}
        onKeyDown={handleKeyDown}
        value={form.values.message}
      />
    </Box>
  )
}
