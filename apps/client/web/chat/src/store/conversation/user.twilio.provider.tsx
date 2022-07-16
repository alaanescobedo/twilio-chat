import { User } from "@twilio/conversations";
import { useContext, useState } from "react";
import { ReactElement } from "react";
import { UsersConversationContext } from "./user.twilio.context";

export const UsersConversationProvider = ({ children }: { children: ReactElement }) => {
  const initialValues = useContext(UsersConversationContext)

  const [isLoading, setIsLoading] = useState(initialValues.isLoading)
  const [users, setUsers] = useState<User[]>(initialValues.users)
  const [me, setMe] = useState<User | null>(initialValues.me)

  return (
    <UsersConversationContext.Provider value={{
      users,
      setUsers,
      isLoading,
      setIsLoading,
      me,
      setMe
    }}>
      {children}
    </UsersConversationContext.Provider>
  );
}