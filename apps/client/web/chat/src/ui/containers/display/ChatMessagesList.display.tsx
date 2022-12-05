import { Stack } from "@mantine/core"
import { Message } from "@twilio/conversations"
import { useEffect, useState } from "react"
import messageService from "../../../services/conversation/message.twilio.service"
import { useUser } from "../../../store/user/user.context"
import { useLongPress } from "../../../utils/long-press.hook"
import { RowMessage } from "../../components/RowMessage"
import ScrollList from "./ScrollList"


export interface MessageProps {
  message: string
}

interface ChatMessagesListDisplayProps {
  messages: Message[]
}
export const ChatMessagesListDisplay = ({ messages }: ChatMessagesListDisplayProps) => {

  const { user } = useUser()

  const { isLongPress, setIsLongPress, handlers } = useLongPress()
  const [isEditing, setIsEditing] = useState(false)
  const [elementsToEdit, setElementsToEdit] = useState<Message[]>([])
  
  useEffect(() => {
    if (isLongPress === false) return setIsEditing(false)
    if (elementsToEdit.length === 0 && isEditing === true) {
      setIsEditing(false)
      setIsLongPress(false)
      return
    }
    if (elementsToEdit.length > 0) setIsEditing(true)
  }, [isLongPress, elementsToEdit, isEditing])

  const handleEditElment = (message: Message) => {
    const sid = message.sid
    if (message.author !== user?.identity) return setElementsToEdit([])
    if (elementsToEdit.includes(message)) {
      return setElementsToEdit(elementsToEdit.filter(message => message.sid !== sid))
    }
    if (isEditing === false) return setElementsToEdit([message])
    setElementsToEdit(prev => [...prev, message])
  }

  const handleDeleteMessage = (message: Message) => {
    if (elementsToEdit.length > 0) return messageService.delete({ messages: elementsToEdit })
    messageService.delete({ messages: [message] })
  }

  const messagesList = messages.map((message, i) => (
    <RowMessage
      key={message.sid}
      message={message}
      index={i}
      selected={isEditing && elementsToEdit.includes(message)}
      onSelect={handleEditElment}
      handlers={handlers}
      onDelete={handleDeleteMessage}
    />
  ))

  return (
    <ScrollList>
      <Stack spacing={0}>
        {messagesList}
      </Stack>
    </ScrollList>
  )
}
