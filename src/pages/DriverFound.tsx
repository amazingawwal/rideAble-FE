import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  Phone,
  MessageCircle,
  Share2,
  ShieldCheck,
  ChevronRight,
  Info,
} from "lucide-react";
import type { RideContextType } from "../assets/types";
import AccessibilityModal from "../components/AccessibilityModal";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function DriverFoundScreen({
  ride,
  clearRide,
}: RideContextType) {
  const [openAccessibility, setOpenAccessibility] = useState(false);
  const [driverPosition, setDriverPosition] = useState({
    lat: Number(-1.4663704),
    lng: Number(53.3786278),
  });

  const passengerLocation = { lat: 6.600044, lng: 3.33445 };
  const avatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAG3UhZr5O2o_Cg0INDC1FFRC0AnIbf_S3o5RAWLvyNMn4ZEMez5yMYHAt8VTpgL2lqbVfixNH1040Vjs9Z7tdfTmQNPtwffofDnRsa1EpxXZuwGcYc5a95xQmMOQxRxAmaoOfGFZ1k6cM3WMikrp-Bh1gxWFo19Qq1bEkIOa9N2YOQhCmCrhLin4NWa4H8Zr5SSG7Z4CXq_k4g05GO3EnUvdZEqcn8Jky6RpLbsDXIkoyDf0BujTMLiIfO2NcJb4slXjXNCc5-xRY";

  const [routePath, setRoutePath] = useState([]);
  const [activeImage, setActiveImage] = useState(0);

  const { driver, route } = ride!;
  // Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Simulate live driver movement (replace with WebSocket later)
  useEffect(() => {
    const interval = setInterval(() => {
      setDriverPosition((pos) => ({
        ...pos,
        lat: pos.lat + 0.00008,
        lng: pos.lng + 0.00005,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get route polyline between driver → passenger
  const fetchRoute = useCallback(() => {
    if (!isLoaded) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: driverPosition,
        destination: passengerLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const points =
            result?.routes[0].overview_path.map((p) => ({
              lat: p.lat(),
              lng: p.lng(),
            })) || [];
          setRoutePath(points);
        }
      },
    );
  }, [driverPosition, "-1.4663704, 53.3786278", isLoaded]);

  useEffect(() => {
    fetchRoute();
  }, [fetchRoute]);

  const navigate = useNavigate();

  function handleCancelRide() {
    // if(!clearRide){
    //     return
    // }
    clearRide!();
    navigate("/pax/ride-request");
  }

  if (!ride) return <p>No ride assigned.</p>;
  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* LEFT SIDE — MAP */}
      <div className="h-[45vh] md:h-screen  w-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={driverPosition}
          zoom={14}
        >
          {/* Driver marker */}
          <Marker position={driverPosition} />

          {/* Passenger marker */}
          <Marker
            position={passengerLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />

          {/* Animated polyline */}
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#0284c7",
              strokeOpacity: 0.9,
              strokeWeight: 5,
            }}
          />
        </GoogleMap>
      </div>

      {/* RIGHT SIDE — Driver Info */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-6 bg-white shadow-xl rounded-l-2xl flex flex-col"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold">Driver Found 🎉</h2>
          <p className="text-gray-600">Your driver is on the way</p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-700 font-medium">En route</span>
          </div>
        </div>

        {/* Driver Info */}

        <div className="flex items-center gap-4 mb-6">
          <img src={avatar} className="w-16 h-16 rounded-full border shadow" />
          <div>
            <p className="text-xl font-semibold">
              {driver.driver.name || "Ayo"}
            </p>
            <p className="text-yellow-600 text-sm">⭐ {4.9}</p>

            <div className="flex items-center gap-1 text-green-600 mt-1">
              <ShieldCheck size={16} />
              <span className="text-sm font-medium">Verified Driver</span>
            </div>

            <p className="text-gray-500 text-sm mt-1">
              {route.durationMin} min arrival
            </p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="bg-gray-100 p-4 rounded-xl shadow-sm mb-5">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-800">Vehicle</p>
            <button
              className="text-sky-600 flex items-center gap-1"
              onClick={() => setOpenAccessibility(true)}
            >
              <Info size={14} /> Accessibility
            </button>
          </div>

          <p className="font-semibold mt-1">
            {driver.vehicleMake} {driver.vehicleModel}
          </p>
          <p className="text-gray-500 text-sm">
            Plate Number: {driver.plateNumber}
          </p>
        </div>

        {/* Vehicle Images Carousel */}
        {driver.images?.length > 0 && (
          <div className="relative mb-6">
            <img
              src={driver.images[activeImage]}
              className="w-full h-40 object-cover rounded-xl shadow"
            />

            <button
              className="absolute right-2 top-1/2 bg-white p-2 rounded-full shadow"
              onClick={() =>
                setActiveImage((prev) => (prev + 1) % driver.images.length)
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Contact Buttons */}
        <div className="grid grid-cols-3 gap-3 mt-auto">
          <button className="bg-sky-600 text-white rounded-xl py-3 flex flex-col items-center shadow">
            <Phone size={20} />
            <span className="text-xs mt-1">Call</span>
          </button>

          <button className="bg-sky-100 text-sky-700 rounded-xl py-3 flex flex-col items-center shadow">
            <MessageCircle size={20} />
            <span className="text-xs mt-1">Chat</span>
          </button>

          <button className="bg-purple-100 text-purple-700 rounded-xl py-3 flex flex-col items-center shadow">
            <Share2 size={20} />
            <span className="text-xs mt-1">Share Trip</span>
          </button>
        </div>

        <button
          onClick={handleCancelRide}
          className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium shadow"
        >
          Cancel Ride
        </button>
      </motion.div>

      {/* Accessibility Popup */}
      <AccessibilityModal
        open={openAccessibility}
        onClose={() => setOpenAccessibility(false)}
        features={driver.accessibilityFeature}
      />
    </div>
  );
}
