import { Conversation, JSONValue, Participant } from "@twilio/conversations"
import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"

export const inviteParticipant = async ({ conversation, identity, attributes }: InviteParticipantProps) => {
  if (!conversation) throw new Error('Conversation not found')
  const [error, participant] = await tryToCatch<Participant>(() => conversation.add(identity, attributes))
  if (error || !participant) throw error
}
export const getMeAsParticipant = async ({ conversation, username }: GetMeProps) => {
  if (!conversation) throw new Error('Conversation not found')
  const [error, me] = await tryToCatch<Participant>(() => conversation.getParticipantByIdentity(username))
  // devDebugger({ error, me })
  if (error || !me) throw error
  return me
}
export const removeParticipant = async ({ conversation, participant }: RemoveParticipantProps) => {
  if (!conversation) throw new Error('Conversation not found')
  const [error] = await tryToCatch(() => conversation.removeParticipant(participant))
  if (error) throw error
}
export const giveChannelAdminRole = async ({ channelId, participantSid }: GiveChannelAdminRoleProps) => {
  if (!channelId || !participantSid) throw new Error('Conversation not found')
  const payload: RequestInit = {
    body: JSON.stringify({ channelId, participantSid, })
  }
  const [error] = await tryToCatch(() =>
    fetch.post('/api/v1/conversations/chat/participant/give-admin-channel-role', payload))
  if (error) throw error
}

export const revokeChannelAdminRole = async ({ channelId, participantSid }: GiveChannelAdminRoleProps) => {
  if (!channelId || !participantSid) throw new Error('Conversation not found')
  const payload: RequestInit = {
    body: JSON.stringify({ channelId, participantSid, })
  }
  const [error] = await tryToCatch(() =>
    fetch.post('/api/v1/conversations/chat/participant/revoke-admin-channel-role', payload))
  if (error) throw error
}

export default {
  invite: inviteParticipant,
  getMe: getMeAsParticipant,
  remove: removeParticipant,
  giveChannelAdminRole,
  revokeChannelAdminRole
}


interface InviteParticipantProps {
  conversation: Conversation | null //TODO: remove null, implementations will need to be refactored
  identity: string
  attributes?: JSONValue
}
interface GetMeProps {
  conversation: Conversation | null
  username: string
}
interface RemoveParticipantProps {
  conversation: Conversation | null
  participant: string | Participant
}
interface GiveChannelAdminRoleProps {
  channelId: string
  participantSid: string
}