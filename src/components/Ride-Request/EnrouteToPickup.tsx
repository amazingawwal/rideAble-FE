import { motion } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";

export default function EnRouteToPickup({ ride, onArrived }) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white p-6 shadow-xl rounded-l-2xl overflow-y-auto"
    >
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2">Heading to Pickup</h2>

        <div className="bg-white p-4 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Pickup Location</p>
          <p className="font-bold flex items-center gap-2">
            <MapPin className="text-red-500" size={18} />
            {ride.pickup}
          </p>

          <div className="mt-4">
            <p className="text-gray-500 text-sm">Estimated Arrival</p>
            <p className="font-bold text-lg">{ride.etaToPickup} mins</p>
          </div>

          <button
            className="w-full mt-6 py-3 bg-green-600 text-white rounded-xl font-semibold"
            onClick={onArrived}
          >
            Arrived at Pickup
          </button>
        </div>
      </div>
      <Navigation />
    </motion.div>
  );
}
