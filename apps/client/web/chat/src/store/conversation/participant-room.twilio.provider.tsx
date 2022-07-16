import { Participant } from "@twilio/conversations";
import { useContext, useState } from "react";
import { ReactElement } from "react";
import { ParticipantsRoomContext } from "./participant-room.twilio.context";

export const ParticipantRoomProvider = ({ children }: { children: ReactElement }) => {
  const initialValues = useContext(ParticipantsRoomContext)

  const [isLoading, setIsLoading] = useState(initialValues.isLoading)
  const [participants, setParticipants] = useState<Participant[]>(initialValues.participants)
  const [me, setMe] = useState<Participant | null>(initialValues.me)
  const [listenedEvents, setListenedEvents] = useState(initialValues.listenedEvents)

  return (
    <ParticipantsRoomContext.Provider value={{
      participants,
      setParticipants,
      isLoading,
      setIsLoading,
      listenedEvents,
      setListenedEvents,
      me,
      setMe
    }}>
      {children}
    </ParticipantsRoomContext.Provider>
  );
}