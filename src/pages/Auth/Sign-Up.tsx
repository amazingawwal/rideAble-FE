import { useState } from "react";
import Button from "../../components/Button";
import InputField from "../../components/Input";
import { apiRequest } from "../../utils/api/api";
import { motion } from "framer-motion";
import { BigIcon } from "../../components/React_Icons/Accessible";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    disabilityType: "",
    accessibilityNeeds: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await apiRequest("/auth/signup", "POST", form);
      setMessage("Account created successfully! You can now log in.");
    } catch (err) {
        if (err instanceof Error) {
    setMessage(err.message);
  } else {
    setMessage("An unknown error occurred");
  }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden md:flex flex-col justify-center bg-linear-to-br from-sky-900 to-sky-200 text-white p-10 sticky top-0 h-screen"
      >
        <div className="text-center space-y-6 max-w-sm mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg leading-relaxed"
          >
            Empowering accessible travel for everyone — wherever you need to go,
            rideAble is with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="w-100 mx-auto mt-4 opacity-90"
          >
            <BigIcon />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center bg-gray-50 px-6 py-10 overflow-y-auto"
      >
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-1"
          >
            <h2 className="text-2xl font-bold text-sky-600">Create Account</h2>
            <p className="text-gray-500">
              Sign up to book accessible rides effortlessly.
            </p>
          </motion.div>
          <InputField
            label="Full Name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Disability Type
            </label>
            <select
              name="disabilityType"
              value={form.disabilityType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="" disabled>
                Select option
              </option>
              <option value="Sensory">Sensory</option>
              <option value="Mobility">Mobility</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <InputField
            label="Accessibility Needs (optional)"
            name="accessibilityNeeds"
            type="text"
            value={form.accessibilityNeeds}
            onChange={handleChange}
            placeholder="Describe any specific needs"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {/* </div> */}
          {/* </div> */}

          <div className="pt-4">
            <Button type="submit" size="md" loading={loading}>
              Sign Up
            </Button>
          </div>
          {message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-red-500"
            >
              {message}
            </motion.p>
          )}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-sky-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
