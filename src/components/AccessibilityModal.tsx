import { motion } from "framer-motion";

export default function AccessibilityModal({ open, onClose, features }) {
  if (!open) return null;

  return (
    
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-80 shadow-xl"
      >
        <h3 className="text-lg font-bold mb-4">Accessibility Features</h3>

        <ul className="space-y-2 text-gray-700">
          {features.map((f, i) => (
            <li key={i} className="bg-gray-100 px-3 py-2 rounded-lg">
              {f.replace(/_/g, " ")}
            </li>
          ))}
        </ul>

        <button
          className="mt-5 w-full bg-sky-600 text-white py-2 rounded-xl"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
