import { Box, Button, Group, Title } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { useConversation } from "../../../store/conversation/conversation.twilio.context";
import PrefixIcon from "../../components/PrefixIcon"


interface ChatDetailsContainerProps {
  chatName: string;
}
export const ChatDetailsContainer = ({ chatName }: ChatDetailsContainerProps) => {

  const { setIdentity } = useConversation()

  const navigate = useNavigate()

  const handleLogout = () => {
    setIdentity('')
    navigate('/', { replace: true })
  }

  return (
    <Group p='sm' px='lg' sx={(theme) => ({
      backgroundColor: theme.colors.gray[9],
      justifyContent: 'space-between'
    })}>
      <Group spacing={0}>
        <PrefixIcon />
        <Title order={3}>{chatName}</Title>
      </Group>
      <Box>
        <Button color='cyan' onClick={handleLogout}>Logout</Button>
      </Box>
    </Group>
  )
}
