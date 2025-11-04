import { useState } from "react";
import Button from "../../components/Button";
import { apiRequest } from "../../utils/api/api";
import InputField from "../../components/Input";

// export default function Login({ onAuthSuccess }) {
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/auth/login", "POST", { email, password });
      localStorage.setItem("authToken", data.access_token);
      console.log(data)
    //   onAuthSuccess?.(data.pax);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
    className=" flex  justify-center px-4"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-sky-600">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center">Log in to your rideAble account</p>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <InputField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  required  />
        </div>

        <div>
          <InputField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
        </div>

          <div className="text-right">
    <a
      href="/forgot-password"
      className="text-sm text-sky-500 hover:text-sky-600 hover:underline"
    >
      Forgot password?
    </a>
  </div>
        <Button variant="primary" type="submit" size="sm" loading={loading}>
          Log In
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-sky-500 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
