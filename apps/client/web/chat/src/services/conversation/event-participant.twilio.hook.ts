import { useContext } from "react"
import { ParticipantsRoomContext } from "../../store/conversation/participant-room.twilio.context"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"

export const useEventsParticipant = () => {
  const { activeConversation: conversation } = useContext(ConversationContext)
  const { setParticipants, isLoading, setIsLoading, listenedEvents, setListenedEvents } = useContext(ParticipantsRoomContext)

  const onListenParticipants = () => {
    if (!conversation || listenedEvents === true) return
    setListenedEvents(true)

    conversation.on('participantJoined', (participant) => {
      console.log('participantJoined', participant)
      setIsLoading(true)
      setParticipants((prev) => [...prev, participant])
      setIsLoading(false)
    })
    conversation.on('participantLeft', (participant) => {
      setIsLoading(true)
      setParticipants((prev) => prev.filter(p => p.sid !== participant.sid))
      setIsLoading(false)
    })
    conversation.on('participantUpdated', ({ participant, updateReasons }) => {
      console.log('participantUpdated', participant, updateReasons)
      setIsLoading(true)
      setParticipants((prev) => prev.map((p) => p.sid === participant.sid ? participant : p))
      setIsLoading(false)
    })
  }

  return {
    onListenParticipants,
    isLoadingParticipant: isLoading,
    listenedEvents
  }
}
