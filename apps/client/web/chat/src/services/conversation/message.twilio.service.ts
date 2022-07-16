import { Conversation, Message, MessageBuilder } from "@twilio/conversations"
import { tryToCatch } from "../../utils/tryToCatch"

interface SendMessageProps {
  conversation: Conversation | null,
  text: string
  to: string
}
export const sendMessage = async ({ conversation, text, to }: SendMessageProps) => {
  if (!conversation) return
  console.log({ conversation })
  const [errorMessage, message] = await tryToCatch<MessageBuilder>(() => conversation.prepareMessage())
  console.log({ errorMessage, message })
  if (errorMessage || !message) throw errorMessage

  message
    .setBody(text)
    .setSubject(to)
    .build()
    .send()
}

export const deleteMessage = async ({ messages }: { messages: Message[] }) => {
  if (!messages) return
  messages.forEach(message => message.remove())
}

export default {
  send: sendMessage,
  delete: deleteMessage
}