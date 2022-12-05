import { Client, Conversation } from "@twilio/conversations";
import { createContext, Dispatch, SetStateAction, useContext } from "react";


export interface ConversationAttributes {
  prefix: 'hash' | 'speakerphone' | 'lock' | 'notebook' | 'broadcast'
}
interface ConversationContextProps {
  identity: string
  setIdentity: (identity: string) => void
  client: Client | null
  setClient: Dispatch<SetStateAction<Client | null>>
  conversations: Conversation[]
  setConversations: Dispatch<SetStateAction<Conversation[]>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  activeConversation: Conversation | null
  setActiveConversation: Dispatch<SetStateAction<Conversation | null>>
  listenedEvents: boolean
  setListenedEvents: Dispatch<SetStateAction<boolean>>
  roles: { [key: string]: string }
  setRoles: Dispatch<SetStateAction<{ [key: string]: string }>>
  listenedRooms: string[]
  setListenedRooms: Dispatch<SetStateAction<string[]>>
}
export const ConversationContext = createContext<ConversationContextProps>({
  identity: "",
  setIdentity: () => { },
  client: null,
  setClient: () => { },
  conversations: [],
  setConversations: () => { },
  isLoading: false,
  setIsLoading: () => { },
  activeConversation: null,
  setActiveConversation: () => { },
  listenedEvents: false,
  setListenedEvents: () => { },
  roles: {},
  setRoles: () => { },
  listenedRooms: [],
  setListenedRooms: () => { },
})
export const useConversation = () => useContext<ConversationContextProps>(ConversationContext)
