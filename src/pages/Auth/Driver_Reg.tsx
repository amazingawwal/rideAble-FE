import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import InputField from "../../components/Input";
import Spinner from "../../utils/Spinner";
import { motion, AnimatePresence } from "framer-motion";

interface DriverData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
}

interface VehicleData {
  make: string;
  model: string;
  year: string;
  accessibilityFeatures: string[];
  otherFeatures: string;
}

export default function DriverVehicleRegistration() {
  const [activeTab, setActiveTab] = useState<"driver" | "vehicle">("driver");
  const [loading, setLoading] = useState(false);

  const [driverData, setDriverData] = useState<DriverData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseExpiry: "",
  });

  const [vehicles, setVehicles] = useState<VehicleData[]>([
    { make: "", model: "", year: "", accessibilityFeatures: [], otherFeatures: "" },
  ]);

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleVehicleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newVehicles = [...vehicles];
    newVehicles[index][name as keyof VehicleData] = value;
    setVehicles(newVehicles);
  };

  const handleFeatureToggle = (index: number, feature: string) => {
    setVehicles((prev) => {
      const updated = [...prev];
      const selected = updated[index].accessibilityFeatures.includes(feature);
      updated[index].accessibilityFeatures = selected
        ? updated[index].accessibilityFeatures.filter((f) => f !== feature)
        : [...updated[index].accessibilityFeatures, feature];
      return updated;
    });
  };

  const addNewVehicle = () => {
    setVehicles([
      ...vehicles,
      { make: "", model: "", year: "", accessibilityFeatures: [], otherFeatures: "" },
    ]);
  };

  const validateDriver = () => {
    if (!driverData.firstName || !driverData.lastName || !driverData.email || !driverData.phone)
      return "Please fill in all driver details.";
    return null;
  };

  const validateVehicle = () => {
    for (const v of vehicles) {
      if (!v.make || !v.model || !v.year) return "Please complete all vehicle details.";
    }
    return null;
  };

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateDriver();
    if (error) return toast.error(error);
    setActiveTab("vehicle");
  };

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateVehicle();
    if (error) return toast.error(error);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const payload = { driverData, vehicles };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/drivers/register`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Registration completed successfully!");
      console.log("✅ Registration success:", response.data);
    } catch (err) {
        if(err instanceof Error){
                  toast.error(err.message || "Registration failed");
      console.error("Registration failed:", err);
        }
    } finally {
      setLoading(false);
    }
  };

  // Motion variants
  const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 overflow-hidden">
        <h1 className="text-2xl font-bold mb-2">Driver & Vehicle Registration</h1>
        <p className="text-gray-600 mb-6">
          Complete both sections to start your operations.
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          {["driver", "vehicle"].map((tab) => (
            <button
              key={tab}
              className={`mr-6 pb-2 font-semibold capitalize ${
                activeTab === tab
                  ? "border-b-2 border-sky-500 text-sky-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab as "driver" | "vehicle")}
            >
              {tab} Registration
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* DRIVER REGISTRATION */}
          {activeTab === "driver" && (
            <motion.form
              key="driver"
              {...fadeSlide}
              onSubmit={handleDriverSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" name="firstName" value={driverData.firstName} onChange={handleDriverChange} required />
                <InputField label="Last Name" name="lastName" value={driverData.lastName} onChange={handleDriverChange} required />
              </div>
              <InputField label="Email" name="email" type="email" value={driverData.email} onChange={handleDriverChange} required />
              <InputField label="Phone Number" name="phone" value={driverData.phone} onChange={handleDriverChange} required />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="License Number" name="licenseNumber" value={driverData.licenseNumber} onChange={handleDriverChange} required />
                <InputField label="License Expiry Date" name="licenseExpiry" type="date" value={driverData.licenseExpiry} onChange={handleDriverChange} required />
              </div>

              <Button variant="primary" size="lg" type="submit">
                Save and Continue to Vehicle Registration
              </Button>
            </motion.form>
          )}

          {/* VEHICLE REGISTRATION */}
          {activeTab === "vehicle" && (
            <motion.form
              key="vehicle"
              {...fadeSlide}
              onSubmit={handleVehicleSubmit}
              className="space-y-6"
            >
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={index}
                  className="p-4 border rounded-xl bg-gray-50"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-lg mb-3 text-sky-600">
                    Vehicle {index + 1}
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Vehicle Make"
                      name="make"
                      value={vehicle.make}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                    />
                    <InputField
                      label="Vehicle Model"
                      name="model"
                      value={vehicle.model}
                      onChange={(e) => handleVehicleChange(index, e)}
                      required
                    />
                  </div>
                  <InputField
                    label="Vehicle Year"
                    name="year"
                    value={vehicle.year}
                    onChange={(e) => handleVehicleChange(index, e)}
                    required
                  />

                  <div>
                    <label className="block font-medium mb-2">
                      Accessibility Features
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-gray-700">
                      {["Wheelchair Ramp", "Hand Controls", "Lowered Floor", "Other"].map(
                        (feature) => (
                          <label key={feature} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={vehicle.accessibilityFeatures.includes(feature)}
                              onChange={() => handleFeatureToggle(index, feature)}
                            />
                            {feature}
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <InputField
                    label="Specify other features"
                    name="otherFeatures"
                    value={vehicle.otherFeatures}
                    onChange={(e) => handleVehicleChange(index, e)}
                  />
                </motion.div>
              ))}

              <motion.div
                className="border border-dashed rounded-lg py-3 text-center text-gray-600 cursor-pointer hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewVehicle}
              >
                + Add Another Vehicle
              </motion.div>

              <Button variant="primary" size="lg" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Start Operations"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}