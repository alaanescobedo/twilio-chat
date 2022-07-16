import { Message } from "@twilio/conversations";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface MessageRoomContextProps {
  messages: Message[]
  setMessages: Dispatch<SetStateAction<Message[]>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  listenedEvents: boolean
  setListenedEvents: Dispatch<SetStateAction<boolean>>
}
export const MessageRoomContext = createContext<MessageRoomContextProps>({
  messages: [],
  setMessages: () => { },
  isLoading: false,
  setIsLoading: () => { },
  listenedEvents: false,
  setListenedEvents: () => { }
})
export const useMessages = () => useContext<MessageRoomContextProps>(MessageRoomContext)