import { useState } from "react";
import type { PassengerData, DriverDTO } from "../../assets/types";
import { UserContext } from "./userContext";

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<PassengerData | DriverDTO | null>(null);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
