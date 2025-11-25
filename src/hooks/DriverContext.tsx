import { useState,   } from "react";
import type { RideResponse } from "../assets/types";
// import type { RideContextType } from "../assets/types";
import { useNavigate } from "react-router-dom";
import { RideContext } from "./UseRide";

// export const RideContext = createContext<RideContextType>({
//   ride: null,
//   setRide: () => {},
//   clearRide: () => {}
// });

export const RideProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
  const [ride, setRide] = useState<RideResponse | null>(null);

  const clearRide = () => {
    setRide(null)
    navigate("/pax/ride-request")
  };

  return (
    <RideContext.Provider value={{ ride, setRide, clearRide }}>
      {children}
    </RideContext.Provider>
  );
};

