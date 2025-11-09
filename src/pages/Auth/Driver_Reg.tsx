import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../../components/Button";
import InputField from "../../components/Input";
import Spinner from "../../utils/Spinner";

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

  const [vehicleData, setVehicleData] = useState<VehicleData>({
    make: "",
    model: "",
    year: "",
    accessibilityFeatures: [],
    otherFeatures: "",
  });

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    setVehicleData((prev) => {
      const selected = prev.accessibilityFeatures.includes(feature);
      return {
        ...prev,
        accessibilityFeatures: selected
          ? prev.accessibilityFeatures.filter((f) => f !== feature)
          : [...prev.accessibilityFeatures, feature],
      };
    });
  };

  const validateDriver = () => {
    if (!driverData.firstName || !driverData.lastName || !driverData.email || !driverData.phone)
      return "Please fill in all driver details.";
    return null;
  };

  const validateVehicle = () => {
    if (!vehicleData.make || !vehicleData.model || !vehicleData.year)
      return "Please complete all vehicle details.";
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
      const payload = { driverData, vehicleData };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/drivers/register`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Registration completed successfully!");
      console.log("✅ Registration success:", response.data);
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-bold mb-2">Driver & Vehicle Registration</h1>
        <p className="text-gray-600 mb-6">
          Complete both sections to start your operations.
        </p>

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            className={`mr-6 pb-2 font-semibold ${
              activeTab === "driver"
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("driver")}
          >
            Driver Registration
          </button>
          <button
            className={`pb-2 font-semibold ${
              activeTab === "vehicle"
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("vehicle")}
          >
            Vehicle Registration
          </button>
        </div>

        {/* DRIVER REGISTRATION */}
        {activeTab === "driver" && (
          <form onSubmit={handleDriverSubmit} className="space-y-4">
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
          </form>
        )}

        {/* VEHICLE REGISTRATION */}
        {activeTab === "vehicle" && (
          <form onSubmit={handleVehicleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Vehicle Make" name="make" value={vehicleData.make} onChange={handleVehicleChange} required />
              <InputField label="Vehicle Model" name="model" value={vehicleData.model} onChange={handleVehicleChange} required />
            </div>
            <InputField label="Vehicle Year" name="year" value={vehicleData.year} onChange={handleVehicleChange} required />

            <div>
              <label className="block font-medium mb-2">Accessibility Features</label>
              <div className="grid grid-cols-2 gap-2 text-gray-700">
                {["Wheelchair Ramp", "Hand Controls", "Lowered Floor", "Other"].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={vehicleData.accessibilityFeatures.includes(feature)}
                      onChange={() => handleFeatureToggle(feature)}
                    />
                    {feature}
                  </label>
                ))}
              </div>
            </div>

            <InputField label="Specify other features" name="otherFeatures" value={vehicleData.otherFeatures} onChange={handleVehicleChange} />

            <div className="border border-dashed rounded-lg py-3 text-center text-gray-600">
              + Add Another Vehicle
            </div>

            <Button variant="primary" size="lg" type="submit" disabled={loading}>
              {loading ? <Spinner /> : "Start Operations"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
