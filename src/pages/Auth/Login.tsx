import { useState } from "react";
import Button from "../../components/Button";
import { apiRequest } from "../../utils/api/api";
import InputField from "../../components/Input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AccessIcon } from "../../components/React_Icons/Accessible";
import { useNavigate } from "react-router-dom";
import type { LoginProps } from "../../assets/types";

export default function Login({ onAuthSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/auth/login", "POST", { email, password });
      setMessage("Login successful!");
      onAuthSuccess?.(data);
      navigate("/dashboard");
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
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center bg-gray-50 px-6 py-10 overflow-y-auto"
      >
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-sky-600">Welcome Back</h2>
            <p className="text-gray-500">Log in to your rideAble account</p>
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

          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1">
              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-sky-500 hover:text-sky-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="md" loading={loading}>
              {loading ? <p>Logging in...</p> : <p>Log in</p>}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-sky-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
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
            <AccessIcon />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
