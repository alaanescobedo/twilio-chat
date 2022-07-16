import { useState } from "react";
import { ReactElement } from "react";
import { UserContext, useUser } from "./user.context";


export const UserProvider = ({ children }: { children: ReactElement }) => {
  const initialValues = useUser()
  const [user, setUser] = useState(initialValues.user)

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
}