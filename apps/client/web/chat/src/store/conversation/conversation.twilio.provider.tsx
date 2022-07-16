import { Client, Conversation } from "@twilio/conversations";
import { useContext, useState } from "react";
import { ReactElement } from "react";
import conversationTwilioService from "../../services/conversation/conversation.twilio.service";
import { useSessionStorage } from "../../services/storage/session-storage.hook";
import { ConversationContext } from "./conversation.twilio.context";


export const ConversationProvider = ({ children }: { children: ReactElement }) => {
  const initialValues = useContext(ConversationContext);

  const [isLoading, setIsLoading] = useState(initialValues.isLoading);
  const [identity, setIdentity] = useState<string>(initialValues.identity);
  const [client, setClient] = useState<Client | null>(initialValues.client);
  const [conversations, setConversations] = useState<Conversation[]>(initialValues.conversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(initialValues.activeConversation);
  const [listenedEvents, setListenedEvents] = useState<boolean>(initialValues.listenedEvents);
  const [roles, setRoles] = useState<{ [key: string]: string }>(initialValues.roles);

  const [identityStorage, setIdentityStorage] = useSessionStorage({
    key: 'identity',
    defaultValue: '',
  })
  const handleSetIdentity = (identity: string) => {
    setIdentityStorage(identity);
    setIdentity(identity);
  }

  return (
    <ConversationContext.Provider value={{
      conversations,
      setConversations,
      client,
      setClient,
      identity: identity ? identity : identityStorage,
      setIdentity: handleSetIdentity,
      isLoading,
      setIsLoading,
      activeConversation,
      setActiveConversation,
      listenedEvents,
      setListenedEvents,
      roles,
      setRoles
    }}>
      {children}
    </ConversationContext.Provider>
  );
}