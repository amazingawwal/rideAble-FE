import { createContext, useContext } from "react";
import type { RideContextType } from "../assets/types";
// import { RideContext } from "./DriverContext";

export const RideContext = createContext<RideContextType>({
  ride: null,
  setRide: () => {},
  clearRide: () => {}
});

export const useRide = () => useContext(RideContext);
