import { Conversation } from "@twilio/conversations"
import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"

export const listConversations = async () => {
  const [error, conversations] = await tryToCatch<Conversation[]>(() => fetch.get('/api/v1/conversations/chat/list-rooms'))
  if (error || !conversations) throw error
  return conversations
}

export const deleteConversation = async (room: string) => {
  if (!room) throw new Error('Room is required')
  const [error] = await tryToCatch(() => fetch.delete(`/api/v1/conversations/chat/${room}`))
  if (error) throw error
}
export const deleteUser = async (userSid: string) => {
  if (!userSid) throw new Error('UserId is required')
  const [error] = await tryToCatch(() => fetch.delete(`/api/v1/conversations/chat/user/${userSid}`))
  if (error) throw error
}

export default {
  listConversations,
  deleteConversation,
  deleteUser
}