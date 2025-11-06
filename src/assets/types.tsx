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

export type PassengerData = {
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
  user: PassengerData | null;
};

export type ProtectedRouteProps = {
  children: React.ReactNode;
};
