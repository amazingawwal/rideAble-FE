import Button from "../components/Button";
import {useNavigate} from "react-router-dom";
export default function Auth() {
 const navigate = useNavigate()
  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-2">
        ride<span className="text-sky-500">Able</span>
      </h1>
      <p className="text-gray-600 mb-6">
        Your accessible ride is just a tap away.
      </p>
      <div className="w-64 space-y-3">
        <Button onClick={() => navigate("/auth/login")} variant="secondary">Sign In</Button>
        <Button onClick={() => navigate("/auth/signup")} variant="outline">Create Account</Button>
      </div>

      <p className="text-gray-400 text-sm mt-6">
        © 2025 rideAble. All rights reserved.
      </p>
    </div>
    </>
  );
}