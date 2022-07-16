import { Client } from "@twilio/conversations"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ConversationContext } from "../../store/conversation/conversation.twilio.context"
import { UserContext } from "../../store/user/user.context"
import { formatTwilioUser } from "../../utils/format-twilio-user"
import { useConversationAuth } from "../conversation/conversation-auth.twilio.hook"
import rolesTwilioService from "../conversation/roles.twilio.service"

export const useBootstrapApp = () => {

  const conversationStore = useContext(ConversationContext)
  const userStore = useContext(UserContext)
  const navigate = useNavigate()

  const { chatToken, getChatToken } = useConversationAuth()
  const [done, setDone] = useState(false)

  const bootstrap = async () => {
    try {
      const identity = conversationStore.identity
      if (!identity) return navigate("/auth/login")

      const accesToken = chatToken ? chatToken : await getChatToken({ identity })
      const client = new Client(accesToken, {
        logLevel: "info"
      })
      const userFormatted = await formatTwilioUser(client)

      const roles = await rolesTwilioService.getRoles()
      conversationStore.setRoles(roles)

      const conversationsPaginator = await client.getSubscribedConversations()
      const conversationsList = conversationsPaginator.items.map(conversation => conversation)

      userStore.setUser(userFormatted)
      conversationStore.setClient(client)
      conversationStore.setConversations(conversationsList)

      setDone(true)
    } catch (error) {
      navigate("/auth/login")
    }
  }

  return {
    bootstrap,
    done
  }
}

