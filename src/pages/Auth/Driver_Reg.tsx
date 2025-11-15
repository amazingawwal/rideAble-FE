import React, { useState, useEffect } from "react";

import toast from "react-hot-toast";
import Button from "../../components/Button";
import InputField from "../../components/Input";
import Spinner from "../../utils/Spinner";
import { motion, AnimatePresence } from "framer-motion";
import type { DriverData, VehicleData } from "../../assets/types";
import { apiRequest } from "../../utils/api/api";

export default function DriverVehicleRegistration() {
  const [activeTab, setActiveTab] = useState<"driver" | "vehicle">("driver");
  const [loading, setLoading] = useState(false);
  const [driverEmailAddress, setDriverEmailAddress] = useState("");

  const [driverData, setDriverData] = useState<DriverData>({
    name: "",
    email: "",
    phone: "",
    licenseNumber: "",
    licenseExpiry: "",
  });

  const [vehicles, setVehicles] = useState<VehicleData[]>([
    {
      plateNumber: "",
      driverEmail: driverEmailAddress,
      type: "",
      capacity: 2,
      images: [],
      vehicleMake: "",
      vehicleModel: "",
      VehicleYear: "",
      accessibilityFeature: [],
      //   otherFeatures: "",
    },
  ]);

  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  //   const handleVehicleChange = (
  //     index: number,
  //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //   ) => {
  //     const { name, value } = e.target;
  //     const newVehicles = [...vehicles];
  //     newVehicles[index][name as keyof VehicleData] = value as never;
  //     const newV = [newVehicles[index].driverEmail='ffff',  ...newVehicles]
  //     setVehicles(newV);
  //   };

  const handleVehicleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setVehicles((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [name]: value } : v)),
    );
  };

  const handleFeatureToggle = (index: number, feature: string) => {
    setVehicles((prev) => {
      const updated = [...prev];
      const vehicle = { ...updated[index] };

      const selected = vehicle.accessibilityFeature.includes(feature);
      vehicle.accessibilityFeature = selected
        ? vehicle.accessibilityFeature.filter((f) => f !== feature)
        : [...vehicle.accessibilityFeature, feature];

      updated[index] = vehicle;
      return updated;
    });
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const urls = files.map((file) => URL.createObjectURL(file));

    setVehicles((prev) => {
      const updated = [...prev];
      updated[index].images = urls;
      return updated;
    });
  };

  const addNewVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        plateNumber: "",
        driverEmail: driverEmailAddress,
        type: "",
        capacity: 0,
        images: [],
        vehicleMake: "",
        vehicleModel: "",
        VehicleYear: "",
        accessibilityFeature: [],
        // otherFeatures: "",
      },
    ]);
    setOpenIndexes((prev) => [...prev, vehicles.length]);
  };

  const toggleOpen = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const validateDriver = () => {
    if (
      !driverData.name ||
      !driverData.email ||
      !driverData.phone ||
      !driverData.licenseNumber
    )
      return "Please fill in all driver details.";
    return null;
  };

  const validateVehicle = () => {
    for (const v of vehicles) {
      if (!v.vehicleMake || !v.vehicleModel || !v.VehicleYear)
        return "Please complete all vehicle details.";
    }
    return null;
  };

  const handleDriverSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    e.preventDefault();
    const error = validateDriver();
    if (error) return toast.error(error);
    console.log(driverData);
    setDriverEmailAddress(driverData.email);
    localStorage.setItem("driverEmail", driverData.email);
    console.log(driverEmailAddress);
    try {
      await apiRequest("/registration/driver", "POST", driverData);
      console.log(driverData);
      toast.success("Driver registration successful!");
      setActiveTab("vehicle");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
        console.log(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("driverEmail");
    if (savedEmail) setDriverEmailAddress(savedEmail);
  }, []);

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateVehicle();
    if (error) return toast.error(error);
    console.log(vehicles);
    console.log("email: ", driverEmailAddress);
    setLoading(true);
    try {
      await apiRequest("/registration/vehicle", "POST", vehicles[0]);

      console.log(vehicles);

      toast.success("Registration completed successfully!");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (driverEmailAddress) {
      setVehicles((prev) =>
        prev.map((v) => ({ ...v, driverEmail: driverEmailAddress })),
      );
    }
  }, [driverEmailAddress]);

  useEffect(() => {
    return () => {
      vehicles.forEach((vehicle) => {
        vehicle.images.forEach((url) => URL.revokeObjectURL(url));
      });
    };
  }, []);

  const fadeSlide = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-8 overflow-hidden">
        <h1 className="text-2xl font-bold mb-2">
          Driver & Vehicle Registration
        </h1>
        <p className="text-gray-600 mb-6">
          Complete both sections to start your operations.
        </p>

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
          {activeTab === "driver" && (
            <motion.form
              key="driver"
              {...fadeSlide}
              onSubmit={handleDriverSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Full Name"
                  name="name"
                  value={driverData.name}
                  onChange={handleDriverChange}
                  required
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={driverData.phone}
                  onChange={handleDriverChange}
                  required
                />
              </div>
              <InputField
                label="Email"
                name="email"
                type="email"
                value={driverData.email}
                onChange={handleDriverChange}
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="License Number"
                  name="licenseNumber"
                  value={driverData.licenseNumber}
                  onChange={handleDriverChange}
                  required
                />
                <InputField
                  label="License Expiry Date"
                  name="licenseExpiry"
                  type="date"
                  value={driverData.licenseExpiry}
                  onChange={handleDriverChange}
                  required
                />
              </div>
              <Button
                variant="outline"
                loading={loading}
                size="sm"
                type="submit"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span>Loading request...</span>
                  </div>
                ) : (
                  "Save and Continue to Vehicle Registration"
                )}
              </Button>
            </motion.form>
          )}

          {activeTab === "vehicle" && (
            <motion.form
              key="vehicle"
              {...fadeSlide}
              onSubmit={handleVehicleSubmit}
              className="space-y-6"
            >
              {vehicles.map((vehicle, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                  <motion.div
                    key={index}
                    className="border rounded-xl bg-gray-50 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleOpen(index)}
                      className="flex justify-between w-full items-center px-4 py-3 bg-sky-100 hover:bg-sky-200 transition-colors"
                    >
                      <h3 className="font-semibold text-sky-700">
                        Vehicle {index + 1}
                      </h3>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sky-600 text-xl"
                      >
                        ▼
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 py-4 space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <InputField
                              label="Vehicle Make"
                              name="vehicleMake"
                              value={vehicle.vehicleMake}
                              onChange={(e) => handleVehicleChange(index, e)}
                              required
                            />
                            <InputField
                              label="Vehicle Model"
                              name="vehicleModel"
                              value={vehicle.vehicleModel}
                              onChange={(e) => handleVehicleChange(index, e)}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <InputField
                              label="Vehicle Year"
                              name="VehicleYear"
                              value={vehicle.VehicleYear}
                              onChange={(e) => handleVehicleChange(index, e)}
                              required
                            />
                            <InputField
                              label="Plate Number"
                              name="plateNumber"
                              value={vehicle.plateNumber}
                              onChange={(e) => handleVehicleChange(index, e)}
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <InputField
                              label="Capacity"
                              name="capacity"
                              type="number"
                              value={vehicle.capacity}
                              onChange={(e) => handleVehicleChange(index, e)}
                              required
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Vehicle Type
                              </label>
                              <select
                                name="type"
                                value={vehicle.type}
                                onChange={(e) => handleVehicleChange(index, e)}
                                className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-sky-500 focus:border-sky-500"
                              >
                                <option value="" disabled>
                                  Select option
                                </option>
                                <option value="Van">Van</option>
                                <option value="Bus">Bus</option>
                                <option value="Car">Car</option>
                              </select>
                            </div>
                          </div>
                          <InputField
                            name="driverEmail"
                            type="email"
                            value={vehicle.driverEmail}
                            onChange={(e) => handleVehicleChange(index, e)}
                            required
                          />
                          <div>
                            <label className="block font-medium mb-2">
                              Accessibility Features
                            </label>
                            <div className="grid grid-cols-2 gap-2 text-gray-700">
                              {[
                                "Ramps_and_lifts",
                                "Wide_door_openings",
                                "Lowered_floors",
                                "Swivel_seats",
                                "Wheelchair_restraints",
                                "Spacious_interior",
                                "Customizable_seating",
                                "Others",
                              ].map((feature) => (
                                <label
                                  key={feature}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    checked={vehicle.accessibilityFeature.includes(
                                      feature,
                                    )}
                                    onChange={() =>
                                      handleFeatureToggle(index, feature)
                                    }
                                  />
                                  {feature}
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* <InputField
                            label="Specify other features"
                            name="otherFeatures"
                            value={vehicle.otherFeatures}
                            onChange={(e) => handleVehicleChange(index, e)}
                          /> */}

                          <div>
                            <label className="block font-medium text-gray-700 mb-2">
                              Upload Vehicle Images
                            </label>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => handleImageChange(index, e)}
                              className="w-full border rounded-lg px-3 py-2 focus:ring-sky-500 focus:border-sky-500"
                            />

                            {vehicle.images && vehicle.images.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-3">
                                {vehicle.images.map((url, imgIndex) => {
                                  return (
                                    <div
                                      key={imgIndex}
                                      className="relative group"
                                    >
                                      <img
                                        src={url}
                                        alt={`Vehicle ${index + 1} Image ${imgIndex + 1}`}
                                        className="h-20 w-20 object-cover rounded-lg border border-gray-300 shadow-sm"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setVehicles((prev) => {
                                            const updated = [...prev];
                                            updated[index].images = updated[
                                              index
                                            ].images.filter(
                                              (_, i) => i !== imgIndex,
                                            );
                                            return updated;
                                          });
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}

              <motion.div
                className="border border-dashed rounded-lg py-3 text-center text-gray-600 cursor-pointer hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addNewVehicle}
              >
                + Add Another Vehicle
              </motion.div>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                loading={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Spinner />
                    <span>Loading request...</span>
                  </div>
                ) : (
                  "Start Operations"
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
