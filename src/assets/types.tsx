export type DisabilityType =
  | ""
  | "Select option"
  | "Mobility"
  | "Sensory"
  | "Others";

export type Pax = {
  name?: string;
  phone?: string;
  email: string;
  disabilityType?: DisabilityType;
  accessibilityNeeds?: string;
  password: string;
};

export interface PassengerData {
  role: "pax";
  response: Pax;
  access_token: string;
}

export type LoginProps = {
  onAuthSuccess?: (data: PassengerData) => void;
};

export type HeadersType = {
  "Content-Type": string;
  Authorization?: string;
};

export type Mat_Symbol = {
  children: string;
};

export type UserProps = {
  user: PassengerData | DriverDTO | null;
};

export type ProtectedRouteProps = {
  loading?: boolean;
  children: React.ReactNode;
};

export type VehicleType = "" | "Select option" | "Car" | "Van" | "Bus";

export interface DriverData {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
}

export interface VehicleData {
  plateNumber: string;
  driverEmail: string;
  type: VehicleType;
  capacity: number;
  images: string[];
  vehicleMake: string;
  vehicleModel: string;
  VehicleYear: string;
  accessibilityFeature: string[];
  // otherFeatures: string;
}

// export type DriverLogin = {
//   email: string;
//   phone: string;
// };

export type DriverLogin = {
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  status: "Unavailable" | "Available" | "Suspended";
};

// export interface DriverDTO  {
//   driver: DriverLogin;
//   access_token: string;
// };

export interface DriverDTO {
  role: "driver";
  response: DriverLogin;
  access_token: string;
}

export interface DriverLoginProps {
  onAuthSuccess?: (data: DriverDTO) => void;
}

export type DriverRideState =
  | "idle"
  | "incoming"
  | "en_route_pickup"
  | "arrived"
  | "in_trip"
  | "completed";

export type RideRequest = {
  pickup: number[] | undefined;
  destination: number[] | undefined;
  accessibilityFeatures: string[];
};

export interface RideResponse {
  route: RouteInfo;
  driver: DriverWithVehicle;
}

export interface RouteInfo {
  distanceKm: string;
  durationMin: string;
}

export interface DriverWithVehicle {
  id: string;
  driverEmail: string;
  plateNumber: string;
  type: "Car" | "Van" | "Bus";
  capacity: number;
  status: "Active";
  createdAt: string;
  vehicleMake: string;
  vehicleModel: string;
  VehicleYear: string;
  accessibilityFeature: string[];
  images: string[];
  driver: DriverDetails;
}

export interface DriverDetails {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  status: "Available" | "Unavailable";
  createdAt: string;
  licenseExpiry: string;
}

export type RideRequestProps = {
  onDriverFound?: (data: RideResponse) => void;
};

export interface RideContextType {
  ride?: RideResponse | null;
  setRide?: (data: RideResponse | null) => void;
  clearRide?: () => void;
}

export interface AccessibilityModalType {
  open: boolean;
  onClose: () => void;
  features: string[];
}

//  {  name: string
//     phone: string
//     email: string
//     licenseNumber: string
//     status: "Unavailable" | "Available" | "Suspended"}

export interface UserContextType {
  user?: DriverDTO | PassengerData | null;
  setUser?: (data: DriverDTO | PassengerData | null) => void;
  clearUser?: () => void;
}
