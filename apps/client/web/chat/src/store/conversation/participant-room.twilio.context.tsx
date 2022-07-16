
import { Participant } from "@twilio/conversations";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface ParticipantsRoomContextProps {
  participants: Participant[]
  setParticipants: Dispatch<SetStateAction<Participant[]>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  listenedEvents: boolean,
  setListenedEvents: Dispatch<SetStateAction<boolean>>
  me: Participant | null
  setMe: Dispatch<SetStateAction<Participant | null>>
}
export const ParticipantsRoomContext = createContext<ParticipantsRoomContextProps>({
  participants: [],
  setParticipants: () => { },
  isLoading: false,
  setIsLoading: () => { },
  listenedEvents: false,
  setListenedEvents: () => { },
  me: null,
  setMe: () => { }
})
export const useParticipants = () => useContext<ParticipantsRoomContextProps>(ParticipantsRoomContext)