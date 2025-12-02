import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Sign-Up";
import Navbar from "./components/Navbar";
import type { PassengerData, RideResponse } from "./assets/types";
import Dashboard from "./pages/Dashboard";
import DriverVehicleRegistration from "./pages/Auth/Driver_Reg";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import DriverLogin from "./pages/Auth/Driver_Login";
import type { DriverDTO } from "./assets/types";
import PassengerDashboard from "./pages/Dashboard/PassengerDashboard";
import RequestRide from "./pages/RideRequest";
import DriverFoundScreen from "./pages/DriverFound";
import DriverDashboard from "./pages/Dashboard/DriverDashboard";
import { useRide } from "./hooks/UseRide";
import { useUser } from "./hooks/user/userContext";

function App() {
  const { setRide } = useRide();
  const { ride, clearRide } = useRide();
  const { setUser } = useUser();

  const handleAuthSuccess = (data: PassengerData | DriverDTO) => {
    localStorage.setItem("token", data.access_token);
    console.log("Data:", data);
    setUser?.(data);
  };

  const handleFindRide = (data: RideResponse) => {
    setRide?.(data);
    console.log({ context: data });
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driver/reg" element={<DriverVehicleRegistration />} />
          <Route
            path="/auth/login"
            element={<Login onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/driver/login"
            element={<DriverLogin onAuthSuccess={handleAuthSuccess} />}
          />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/dashboard/pax"
            element={
              <ProtectedRoute>
                <PassengerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pax/ride-request"
            element={<RequestRide onDriverFound={handleFindRide} />}
          />
          <Route
            path="/dashboard/driver"
            element={
              <ProtectedRoute>
                <DriverDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pax/ride-request/driver-found"
            element={
              <ProtectedRoute>
                <DriverFoundScreen ride={ride} clearRide={clearRide} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
