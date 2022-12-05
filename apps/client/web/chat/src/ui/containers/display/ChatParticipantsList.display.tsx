import { Text } from "@mantine/core";
import { Participant } from "@twilio/conversations";
import { useConversation } from "../../../store/conversation/conversation.twilio.context";
import { RenderIf } from "../../components/RenderIf";
import { RowParticipant } from "../../components/RowUsers";
import ScrollList from "./ScrollList";

interface ChatUsersListDisplayProps {
  participants: Participant[]
}
export const ChatParticipantsListDisplay = ({ participants }: ChatUsersListDisplayProps) => {

  const { roles } = useConversation()
  const participantsSorted = participants.sort((participant) => {
    return roles[participant.roleSid].includes('channel-master') ? -1 : 1
  })
  const participantsList = participantsSorted.map((participant) => (
    <RowParticipant key={participant.identity} participant={participant} />
  ))

  return (
    <ScrollList>
      {participantsList}
    </ScrollList>
  )
}