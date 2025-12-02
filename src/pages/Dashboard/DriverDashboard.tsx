import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type {
  ActiveRideType,
  DriverRideState,
  IncomingRideRequestType,
} from "../../assets/types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  Clock,
  CheckCircle,
  Car,
  DollarSign,
  MapPin,
  User,
  BarChart,
} from "lucide-react";
import EnRouteToPickup from "../../components/Ride-Request/EnrouteToPickup";
import ArrivedAtPickup from "../../components/Ride-Request/ArrivedAtPickup";
import TripCompleted from "../../components/Ride-Request/RideCompleted";
import TripInProgress from "../../components/Ride-Request/RideInProgress";
import IncomingRideRequest from "../../components/Ride-Request/IncomingRideRequest";
import { activeRideData, newIncomingRequest, recentTrips } from "../../assets/staticData";
import { driverLocation } from "../../assets/staticData";
import { useUser } from "../../hooks/user/userContext";
import StatCard from "../../components/StatCard";

export default function DriverDashboard() {
  const [online, setOnline] = useState(true);
  const [currentRide, setCurrentRide] =
    useState<IncomingRideRequestType | null>(null);
  const [incomingRequest, setIncomingRequest] =
    useState<IncomingRideRequestType | null>(null);
  const [rideState, setRideState] = useState<DriverRideState>("idle");
  const [activeRide, setActiveRide] = useState<ActiveRideType | null>(null);

  const [driverPos, setDriverPos] = useState({
    lat: driverLocation.lat,
    lng: driverLocation.lng,
  });

  const { user } = useUser();
  const driver = user?.response;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPos((p) => ({
        lat: p.lat + 0.00002,
        lng: p.lng + 0.00003,
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingRequest(newIncomingRequest);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (rideData: ActiveRideType) => {
    setCurrentRide(incomingRequest);
    setIncomingRequest(null);
    setActiveRide(rideData);
    //   setRideState("en_route_pickup");
  };

  const reset = () => {
    setRideState("idle");
    setCurrentRide(null);
  };

  const handleDecline = () => {
    setIncomingRequest(null);
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-3 bg-gray-100">
      <div className="md:col-span-2 h-[40vh] md:h-screen md:sticky top-0  ">
        <GoogleMap
          zoom={15}
          center={driverPos}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          <Marker position={driverPos} />
        </GoogleMap>
      </div>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-white p-6 shadow-xl rounded-l-2xl overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-2">Driver Dashboard</h2>
        <p className="text-gray-500 mb-4">Welcome back, {driver?.name}</p>

        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-xl mb-4">
          <span className="font-semibold">
            Status: {online ? "Online" : "Offline"}
          </span>
          <button
            onClick={() => setOnline(!online)}
            className={`px-4 py-2 rounded-xl font-medium ${
              online ? "bg-green-600 text-white" : "bg-gray-300"
            }`}
          >
            {online ? "Go Offline" : "Go Online"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={<DollarSign />}
            title="Earnings Today"
            value="₦12,400"
          />
          <StatCard icon={<CheckCircle />} title="Rides Completed" value="6" />
          <StatCard icon={<Clock />} title="Online Hours" value="4.3 hrs" />
          <StatCard icon={<BarChart />} title="Rating" value="4.8 ⭐" />
        </div>

        {currentRide ? (
          <div className="p-4 bg-blue-50 rounded-xl mb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Car size={18} /> Upcoming Ride
            </h3>

            <div className="mb-3">
              <p className="text-gray-600 text-sm">Pickup</p>
              <p className="font-medium">{currentRide.pickup}</p>
            </div>

            <div className="mb-3">
              <p className="text-gray-600 text-sm">Destination</p>
              <p className="font-medium">{currentRide.destination}</p>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <User size={18} className="text-gray-600" />
              <span className="font-medium">{currentRide.passengerName}</span>
            </div>

            <button
              onClick={() => setRideState("en_route_pickup")}
              className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold shadow"
            >
              Start Ride
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No rides assigned yet.</p>
        )}

        {rideState === "en_route_pickup" && (
          <EnRouteToPickup
            ridePickup={currentRide}
            onArrived={() => setRideState("arrived")}
          />
        )}

        {rideState === "arrived" && (
          <ArrivedAtPickup
            ridePickup={currentRide}
            onStartTrip={() => setRideState("in_trip")}
          />
        )}

        {rideState === "in_trip" && (
          <TripInProgress
            rideInprogress={activeRide}
            onEndTrip={() => setRideState("completed")}
          />
        )}

        {rideState === "completed" && (
          <TripCompleted rideInprogress={activeRide} onFinish={() => reset()} />
        )}

        <h3 className="font-bold text-lg mb-3">Recent Trips</h3>

        <div className="space-y-3">
          {recentTrips.map((trip) => (
            <div
              key={trip.tripNumber}
              className="p-3 bg-gray-50 rounded-xl border flex justify-between"
            >
              <div>
                <p className="font-medium">Trip {trip.tripNumber}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin size={14} /> {trip.travelDistance} km • {trip.travelTime} min
                </p>
              </div>
              <span className="font-semibold">₦{trip.fare}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <IncomingRideRequest
        request={incomingRequest}
        onAccept={() => handleAccept(activeRideData)}
        onDecline={handleDecline}
      />
    </div>
  );
}


