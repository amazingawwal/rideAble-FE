import { useState } from "react";
import type { RideResponse } from "../assets/types";
import { RideContext } from "./UseRide";

export const RideProvider = ({ children }: { children: React.ReactNode }) => {
  const [ride, setRide] = useState<RideResponse | null>(null);

  const clearRide = () => {
    setRide(null);
  };

  return (
    <RideContext.Provider value={{ ride, setRide, clearRide }}>
      {children}
    </RideContext.Provider>
  );
};
