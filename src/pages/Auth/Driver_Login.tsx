import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../components/Input";
import Button from "../../components/Button";
import Spinner from "../../utils/Spinner";
import toast from "react-hot-toast";
import { apiRequest } from "../../utils/api/api";
import { AccessVehicle } from "../../components/React_Icons/Accessible";
import { Link } from "react-router-dom";
import type { DriverLogin, DriverDTO } from "../../assets/types";

interface DriverLoginProps {
  onAuthSuccess?: (data: DriverDTO) => void;
}

export default function DriverLogin({ onAuthSuccess }: DriverLoginProps) {
  const [formData, setFormData] = useState<DriverLogin>({
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.phone) {
      toast.error("Please fill in both email and phone number.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest("/registration/sign-in", "POST", formData);
      toast.success("Driver login successful!");

      onAuthSuccess?.(response);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "Login failed");
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">

    // </div>

    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center bg-gray-50 px-6 py-10 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
        >
          {/* Logo & Heading */}
          <div className="flex flex-col items-center mb-6">
            <p className="text-gray-800  text-lg">Driver Login Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="primary" size="lg" loading={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Sign In as Driver"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-gray-500">
            <Link to="" className="text-sky-500 hover:underline">
              Forgot phone or email?
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-gray-500">
            Not registered?{" "}
            <Link
              to="/driver/reg"
              className="text-sky-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex flex-col justify-center bg-linear-to-br from-sky-300 to-sky-900 text-white p-10 sticky top-0 h-screen"
      >
        <div className="text-center space-y-6 max-w-sm mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg leading-relaxed"
          >
            Accessibility made simple — log in to continue your rideAble
            journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="w-60 mx-auto mt-4 opacity-90"
          >
            <AccessVehicle />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
