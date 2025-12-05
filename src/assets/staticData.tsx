import type { Journey } from "./types";

export const newIncomingRequest = {
  pickup: "Ikeja City Mall",
  destination: "Lekki Phase 1",
  passengerName: "Sarah Johnson",
  distanceToPickup: 2.4,
  estimatedFare: 2500,
  estimatedTimeToPickup: 35,
};

export const activeRideData = {
  pickup: "Ikeja City Mall",
  destination: "Lekki Phase 1",
  passengerName: "Sarah Johnson",
  distanceToPickup: 2.4,
  estimatedFare: 2500,
  estimatedTimeToPickup: 35,
  estimatedTime: 75,
  estimatedDistance: 40,
  estimatedDistanceRemaining: 40,
  estimatedTimeRemaining: 75,
};

export const driverLocation = {
  lat: 6.5244,
  lng: 3.3792,
};

export const recentTrips = [
  {
    tripNumber: 1,
    travelDistance: 5.4,
    travelTime: 37,
    fare: 1280,
  },
  {
    tripNumber: 2,
    travelDistance: 3.4,
    travelTime: 50,
    fare: 1580,
  },
  {
    tripNumber: 3,
    travelDistance: 5.4,
    travelTime: 85,
    fare: 1780,
  },
];

export const allJourneys: Journey[] = [
    {
      from: "123 Main St.",
      to: "Phoenix Medical Center, Ikeja",
      date: "Jan 12, 2025",
      distance: "4.2 miles",
      duration: "13 mins",
      fare: "₦1200.00",
    },
    {
      from: "456 Al Ave.",
      to: "Greenwood Mall",
      date: "Jan 9, 2025",
      distance: "2.8 miles",
      duration: "8 mins",
      fare: "₦900.00",
    },
    {
      from: "Home",
      to: "St. Mary's Hospital",
      date: "Jan 3, 2025",
      distance: "6.5 miles",
      duration: "17 mins",
      fare: "₦1500.00",
    },
    {
      from: "12 Clover St., Maitama",
      to: "Wuse Terminal 1",
      date: "Dec 28, 2024",
      distance: "10.8 miles",
      duration: "25 mins",
      fare: "₦2800.00",
    },
    {
      from: "333 Ikorodu Ln 3.",
      to: "Northside Clinic",
      date: "Dec 21, 2024",
      distance: "3.3 miles",
      duration: "10 mins",
      fare: "₦1100.20",
    },
    {
      from: "80 Moremi St.",
      to: "City General Hospital",
      date: "Dec 16, 2024",
      distance: "1.5 miles",
      duration: "6 mins",
      fare: "₦600.00",
    },
  ];