import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Accessibility, Settings, LogOut, User } from "lucide-react";
import type { ProfileMenuProps } from "../assets/types";

export default function ProfileMenu({
  user,
  onLogout,
  onManageLocations,
  onManageAccessibility,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 overflow-hidden  "
      >
        <User size={28} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl border p-2 z-50"
          >
            <div className="p-3 border-b">
              <p className="font-semibold text-gray-800">
                {user?.response.name}
              </p>
              <p className="text-sm text-gray-500">{user?.response.email}</p>
            </div>

            <div className="py-2">
              <button
                onClick={() => {
                  onManageLocations();
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg"
              >
                <MapPin size={18} />
                <span>Manage Locations</span>
              </button>

              <button
                onClick={() => {
                  onManageAccessibility();
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg"
              >
                <Accessibility size={18} />
                <span>Accessibility Preferences</span>
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-lg"
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
            </div>

            {/* Logout */}
            <div className="border-t">
              <button
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-red-50 text-red-600 rounded-lg"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
