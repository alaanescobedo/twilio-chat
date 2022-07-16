import { Message } from "@twilio/conversations";
import { useContext, useState } from "react";
import { ReactElement } from "react";
import { MessageRoomContext } from "./message-room.twilio.context";

export const MessageRoomProvider = ({ children }: { children: ReactElement }) => {
  const initialValues = useContext(MessageRoomContext)

  const [isLoading, setIsLoading] = useState(initialValues.isLoading)
  const [messages, setMessages] = useState<Message[]>(initialValues.messages)
  const [listenedEvents, setListenedEvents] = useState<boolean>(initialValues.listenedEvents)

  return (
    <MessageRoomContext.Provider value={{
      messages,
      setMessages,
      isLoading,
      setIsLoading,
      listenedEvents,
      setListenedEvents
    }}>
      {children}
    </MessageRoomContext.Provider>
  );
}