import { createContext, Dispatch, useContext } from "react";
import { UserApp } from "../../interfaces/user";

interface UserContextProps {
  user: UserApp | null;
  setUser: Dispatch<React.SetStateAction<UserApp | null>>
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => { },
})
export const useUser = () => useContext(UserContext)