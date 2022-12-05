import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"

export const useConversationAuth = () => {

  const getChatToken = async ({ identity }: { identity: string }) => {
    const payload: RequestInit = {
      body: JSON.stringify({ identity })
    }
    const [error, token] = await tryToCatch<{ tokenValue: string }>(
      fetch.post, `/api/v1/conversations/chat/generate-token`, payload
    )
    if (error || !token) throw error
    return token.tokenValue
  }

  return {
    getChatToken
  }
}