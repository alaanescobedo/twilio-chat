import { User } from "@twilio/conversations"
import { useContext } from "react"
import { UsersConversationContext } from "../../store/conversation/user.twilio.context"
import fetch from "../../utils/fetch"
import { tryToCatch } from "../../utils/tryToCatch"

export const useUsersConversation = () => {

  const { users, setUsers, isLoading, setIsLoading, me, setMe } = useContext(UsersConversationContext)

  const getAllUsers = async () => {
    setIsLoading(true)
    const [error, users] = await tryToCatch<User[]>(() => fetch.get(`/api/v1/conversations/chat/users`))
    setIsLoading(false)
    if (error || !users) throw error
    setUsers(users)
    return users
  }

  return {
    getAllUsers,
    users,
    isLoading,
    me,
    setMe
  }
}