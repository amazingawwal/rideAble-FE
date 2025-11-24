import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ArrivedAtPickup({ ride, onStartTrip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4"
    >
      <h2 className="font-bold text-xl mb-3">Arrived at Pickup</h2>

      <div className="bg-white p-5 shadow rounded-2xl">
        <div className="flex items-center gap-3">
          <User className="text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Passenger</p>
            <p className="font-bold">{ride.passengerName}</p>
          </div>
        </div>

        <button
          onClick={onStartTrip}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl font-semibold"
        >
          Start Trip
        </button>
      </div>
    </motion.div>
  );
}
