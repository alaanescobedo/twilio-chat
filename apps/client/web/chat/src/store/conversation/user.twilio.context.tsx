
import { User } from "@twilio/conversations";
import { createContext, Dispatch, SetStateAction } from "react";

interface UsersConversationContextProps {
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  me: User | null,
  setMe: Dispatch<SetStateAction<User | null>>
}
export const UsersConversationContext = createContext<UsersConversationContextProps>({
  users: [],
  setUsers: () => { },
  isLoading: false,
  setIsLoading: () => { },
  me: null,
  setMe: () => { }
})
