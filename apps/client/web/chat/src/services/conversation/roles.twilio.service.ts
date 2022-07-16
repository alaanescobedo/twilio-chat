import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"

export const getRoles = async () => {
  const [error, roles] = await tryToCatch<any>(() => fetch.get('/api/v1/conversations/chat/service/roles'))
  if (error || !roles) throw error
  console.log({ roles })

  return roles
}

export default {
  getRoles
}