import { motion } from "framer-motion";
import type { RideStatus } from "../../assets/types";
// import { Clock, Route } from "lucide-react";

export default function TripInProgress({
  rideInprogress,
  onEndTrip,
}: RideStatus) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4"
    >
      <h2 className="font-bold text-xl mb-3">Trip In Progress</h2>

      <div className="bg-white p-5 rounded-2xl shadow">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-500 text-sm">Distance Left</p>
            <p className="font-bold text-lg">
              {rideInprogress?.estimatedDistanceRemaining} km
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Arrival In</p>
            <p className="font-bold text-lg">
              {rideInprogress?.estimatedTimeRemaining} min
            </p>
          </div>
        </div>

        <button
          onClick={onEndTrip}
          className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl font-semibold"
        >
          End Trip
        </button>
      </div>
    </motion.div>
  );
}
