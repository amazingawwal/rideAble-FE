import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { RideStatus } from "../../assets/types";

export default function TripCompleted({
  rideInprogress,
  onFinish,
}: RideStatus) {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="p-6 text-center"
    >
      <CheckCircle size={70} className="mx-auto text-green-600 mb-4" />

      <h2 className="text-2xl font-bold mb-2">Trip Completed</h2>
      <p className="text-gray-500 mb-4">Good job! Passenger dropped off.</p>

      <div className="bg-white p-4 shadow rounded-xl mb-5">
        <p className="text-gray-500 text-sm">Total Fare</p>
        <p className="font-bold text-2xl">₦{rideInprogress?.estimatedFare}</p>
      </div>

      <button
        onClick={onFinish}
        className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold"
      >
        Finish
      </button>
    </motion.div>
  );
}
