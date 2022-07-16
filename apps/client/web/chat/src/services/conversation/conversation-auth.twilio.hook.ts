import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"
import { useSessionStorage } from "../storage/session-storage.hook"

export const useConversationAuth = () => {
  const [chatToken, setChatToken] = useSessionStorage<string>({
    key: "chatToken",
    defaultValue: ""
  })

  const getChatToken = async ({ identity }: { identity: string }) => {
    const payload: RequestInit = {
      body: JSON.stringify({ identity })
    }
    const [error, token] = await tryToCatch<{ tokenValue: string }>(
      fetch.post, `/api/v1/conversations/chat/generate-token`, payload
    )
    if (error || !token) throw error

    setChatToken(token.tokenValue)
    return token.tokenValue
  }

  return {
    getChatToken,
    clearChatToken: () => setChatToken(""),
    chatToken
  }
}