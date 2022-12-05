import { Client, Conversation } from "@twilio/conversations"
import { tryToCatch } from "../../utils/tryToCatch"

interface HandleConversationProps {
  client: Client | null // TODO: remove null, implementations will need to be refactored
  room: string
  method: 'create' | 'join' | 'get' | 'leave' | 'delete'
}

const conversationFactory = async ({ client, room, method }: HandleConversationProps): Promise<Conversation> => {
  if (!client) throw new Error('Client is required')

  const methods = {
    create: async () => await client.createConversation({ uniqueName: `${Math.ceil(Math.random()*10000)}_${room}`, friendlyName: room }),
    get: async () => await client.getConversationBySid(room),
    join: async () => await client.getConversationBySid(room).then(conversation => conversation.join()),
    leave: async () => await client.getConversationBySid(room).then(conversation => conversation.leave()),
    delete: async () => await client.getConversationBySid(room).then(conversation => conversation.delete()),
  }

  const executeConversation = methods[method]
  const [error, result] = await tryToCatch<Conversation>(executeConversation)
  if (error || result === null) throw error
  return result as Conversation
}

export default {
  conversationFactory
}