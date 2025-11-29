import { createContext, useContext } from "react";
import type { UserContextType } from "../../assets/types";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  clearUser: () => {},
});

export const useUser = () => useContext(UserContext);
