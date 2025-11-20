import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Heart, User, Clock } from "lucide-react";
import Button from "../../components/Button";
import GoogleMapView from "../../utils/services/GoogleMapView";
import { useNavigate } from "react-router-dom";

interface Journey {
  from: string;
  to: string;
  date: string;
  distance: string;
  duration: string;
  fare: string;
}

export default function PassengerDashboard() {
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setUserLocation(null); // fallback to default
      },
    );
  }, []);

  const navigate = useNavigate();

  function handleRideRequest() {
    navigate("/pax/ride-request");
  }

  // ----- COMPLETED JOURNEYS MOCK DATA -----
  const allJourneys: Journey[] = [
    {
      from: "123 Main St.",
      to: "Phoenix Medical Center",
      date: "Jan 12, 2025",
      distance: "4.2 miles",
      duration: "13 mins",
      fare: "$12.50",
    },
    {
      from: "456 Oak Ave.",
      to: "Greenwood Mall",
      date: "Jan 9, 2025",
      distance: "2.8 miles",
      duration: "8 mins",
      fare: "$9.00",
    },
    {
      from: "Home",
      to: "St. Mary's Hospital",
      date: "Jan 3, 2025",
      distance: "6.5 miles",
      duration: "17 mins",
      fare: "$15.80",
    },
    {
      from: "12 Clover St.",
      to: "Airport Terminal 1",
      date: "Dec 28, 2024",
      distance: "10.8 miles",
      duration: "25 mins",
      fare: "$28.00",
    },
    {
      from: "333 Pine Ln.",
      to: "Northside Clinic",
      date: "Dec 21, 2024",
      distance: "3.3 miles",
      duration: "10 mins",
      fare: "$11.20",
    },
    {
      from: "80 Monroe St.",
      to: "City Library",
      date: "Dec 16, 2024",
      distance: "1.5 miles",
      duration: "6 mins",
      fare: "$6.80",
    },
  ];

  // ----- PAGINATION -----
  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState(1);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = allJourneys.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(allJourneys.length / ITEMS_PER_PAGE);

  // ----- MODAL -----
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6">
      <User size={18} />
      {/* NAVBAR */}
      {/* <header className="w-full max-w-6xl flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">
          ride<span className="text-sky-500">Able</span>
        </h1>

        <button className="text-gray-600 hover:text-sky-600 font-medium flex items-center gap-1">
         
          Preferences
        </button>
      </header> */}

      {/* MAIN LAYOUT */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
        {/* LEFT SIDE (same as before) */}
        <div className="flex flex-col gap-6">
          {/* MAP + REQUEST RIDE */}
          <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <div className="w-full h-52 rounded-xl overflow-hidden">
              <GoogleMapView center={userLocation || undefined} />
            </div>

            <Button onClick={handleRideRequest} variant="primary" size="sm">
              Request a Ride
            </Button>
          </div>

          {/* SAVED LOCATIONS */}
          <div className="w-full  bg-white rounded-xl shadow p-4">
            <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
              <MapPin size={18} className="text-sky-600" />
              Saved Locations
            </h2>
            <div className="divide-y">
              <div className="flex justify-between py-3">
                <span>Home</span>
                <span className="text-gray-500 text-sm">123 Main St.</span>
              </div>
              <div className="flex justify-between py-3">
                <span>Work</span>
                <span className="text-gray-500 text-sm">456 Oak Ave.</span>
              </div>
            </div>
            <Button variant="outline">Manage Locations</Button>
          </div>

          {/* PREFERENCES */}
          <div className="w-full bg-white rounded-xl shadow p-4">
            <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-3">
              <Heart size={18} className="text-sky-600" />
              My Preferences
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Preferred Vehicle Type:</span>
                <span>Wheelchair Accessible Van</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Assistance Needed:</span>
                <span>Light assistance with luggage</span>
              </div>
            </div>

            <Button variant="outline">Edit Preferences</Button>
          </div>
        </div>

        {/* RIGHT SIDE — COMPLETED JOURNEYS + PAGINATION */}
        <div className="hidden lg:block bg-white rounded-xl shadow p-4 h-fit">
          <h2 className="flex items-center gap-2 text-gray-700 font-semibold mb-4">
            <Clock size={18} className="text-sky-600" />
            Completed Journeys
          </h2>

          {/* JOURNEY LIST */}
          <div className="space-y-4">
            {paginated.map((j, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedJourney(j)}
                className="border rounded-lg p-3 text-left hover:shadow-sm w-full transition"
              >
                <p className="font-semibold text-gray-700">{j.from}</p>
                <p className="text-gray-500 text-sm">→ {j.to}</p>
                <p className="text-xs text-gray-400 mt-1">{j.date}</p>
              </button>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col">
            <div className="flex justify-between gap-2 items-center mt-5">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
            <span className="text-sm text-center mt-2 text-gray-600">
              Page {page} of {totalPages}
            </span>
          </div>
        </div>
      </div>

      {/* ---------- MODAL ---------- */}
      <AnimatePresence>
        {selectedJourney && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL CONTENT */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
            >
              <h3 className="text-xl font-semibold mb-4">Journey Details</h3>

              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>From:</strong> {selectedJourney.from}
                </p>
                <p>
                  <strong>To:</strong> {selectedJourney.to}
                </p>
                <p>
                  <strong>Date:</strong> {selectedJourney.date}
                </p>
                <p>
                  <strong>Distance:</strong> {selectedJourney.distance}
                </p>
                <p>
                  <strong>Duration:</strong> {selectedJourney.duration}
                </p>
                <p>
                  <strong>Fare:</strong> {selectedJourney.fare}
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedJourney(null)}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
