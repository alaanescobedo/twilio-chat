import { Client } from "@twilio/conversations";
import { UserApp } from "../interfaces/user";
import fetch from "./fetch";
import { isNotEmpty } from "./isNotEmpty";
import type { UserInstance } from 'twilio/lib/rest/conversations/v1/user';


export const formatTwilioUser = async (client: Client) => {
  const twilioUser = client.user

  let attributes: UserApp['attributes'] = JSON.parse(JSON.stringify(twilioUser.attributes))
  if (isNotEmpty(attributes) === true) {
    attributes = {
      avatar: '',
      description: '',
    }
    twilioUser.updateAttributes(JSON.stringify(attributes))
  }

  const conversations = await client.getSubscribedConversations()
  const conversationsSid = conversations.items.map(conversation => conversation.sid)
  // // We can get the userSid from el twilioUser, but its a private property

  const userServer = await fetch.get<UserInstance>(`/api/v1/conversations/chat/users/${twilioUser.identity}`)

  const user: UserApp = {
    id: userServer.sid,
    identity: twilioUser.identity,
    friendlyName: twilioUser.friendlyName,
    serviceSid: userServer.roleSid,
    attributes: JSON.parse(JSON.stringify(attributes)),
    conversationsSid,
    isOnline: twilioUser.isOnline ?? false,
    isNotificable: twilioUser.isNotifiable ?? false,
  }
  return user
}
