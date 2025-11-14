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

export interface PassengerData  {
  role: "pax";
  pax: Pax;
  access_token: string;
};

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

export type DriverLogin = {
  email: string;
  phone: string;
};

// export interface DriverDTO  {
//   driver: DriverLogin;
//   access_token: string;
// };

export interface DriverDTO  {
  role: "driver";
  driver: DriverLogin;
  access_token: string;
};

