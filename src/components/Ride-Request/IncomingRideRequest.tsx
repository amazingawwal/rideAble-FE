import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Clock, ArrowRight } from "lucide-react";
import type { IncomingRequest } from "../../assets/types";

export default function IncomingRideRequest({
  request,
  onAccept,
  onDecline,
}: IncomingRequest) {
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    if (!request) return;

    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          onDecline();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [request]);

  if (!request) return null;

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="
        fixed bottom-0 left-0 right-0 
        bg-white shadow-2xl rounded-t-3xl p-6 
        z-50 md:max-w-md md:mx-auto
      "
    >
      <h2 className="text-xl font-bold mb-3">New Ride Request</h2>

      <div className="flex items-start gap-3 mb-3">
        <MapPin className="text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Pickup</p>
          <p className="font-semibold">{request.pickup}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <ArrowRight className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Destination</p>
          <p className="font-semibold">{request.destination}</p>
        </div>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <User className="text-purple-600" />
        <div>
          <p className="text-sm text-gray-500">Passenger</p>
          <p className="font-semibold">{request.passengerName}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-xl mb-5">
        <div>
          <p className="text-xs text-gray-500">Distance to Pickup</p>
          <p className="font-bold">{request.distanceToPickup} km</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Estimated Fare</p>
          <p className="font-bold">₦{request.estimatedFare}</p>
        </div>

        <div className="flex items-center gap-1">
          <Clock size={16} className="text-red-500" />
          <p className="font-bold">{seconds}s</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onDecline}
          className="py-3 bg-gray-200 text-gray-800 rounded-xl font-semibold"
        >
          Decline
        </button>

        <button
          onClick={() => onAccept(request)}
          className="py-3 bg-green-600 text-white rounded-xl font-semibold"
        >
          Accept Ride
        </button>
      </div>
    </motion.div>
  );
}
