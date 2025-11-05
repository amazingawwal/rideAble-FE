export type DisabilityType = "Mobility" | "Sensory" | "Others";

export type Pax = {
  name: string;
  phone: string;
  email: string;
  disabilityType: DisabilityType;
  accessibilityNeeds: string;  
}

export type PassengerData = {
  pax : Pax
  access_token:string
}


export type LoginProps = {
  onAuthSuccess?: (data: PassengerData) => void;
};

export type HeadersType = {
    "Content-Type" : string
    "Authorization" : string
}