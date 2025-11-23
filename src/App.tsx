import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Sign-Up";
import Navbar from "./components/Navbar";
import { useState } from "react";
import type { PassengerData } from "./assets/types";
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

function App() {
  const [user, setUser] = useState<PassengerData | DriverDTO | null>(null);

  const handleAuthSuccess = (data: PassengerData) => {
    localStorage.setItem("token", data.access_token);
    console.log(data);
    setUser(data);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/driver/reg" element={<DriverVehicleRegistration />} />
          <Route
            path="/auth/login"
            element={<Login onAuthSuccess={handleAuthSuccess} />}
          />
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/dashboard/pax" element={<PassengerDashboard />} />
          <Route path="/pax/ride-request" element={<RequestRide />} />
          <Route
            path="/dashboard/driver"
            element={<DriverDashboard driver={"driver"} />}
          />
          <Route
            path="/pax/ride-request/driver-found"
            element={
              <DriverFoundScreen
                driver={{
                  name: "John Ade",
                  rating: 4.9,
                  avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAG3UhZr5O2o_Cg0INDC1FFRC0AnIbf_S3o5RAWLvyNMn4ZEMez5yMYHAt8VTpgL2lqbVfixNH1040Vjs9Z7tdfTmQNPtwffofDnRsa1EpxXZuwGcYc5a95xQmMOQxRxAmaoOfGFZ1k6cM3WMikrp-Bh1gxWFo19Qq1bEkIOa9N2YOQhCmCrhLin4NWa4H8Zr5SSG7Z4CXq_k4g05GO3EnUvdZEqcn8Jky6RpLbsDXIkoyDf0BujTMLiIfO2NcJb4slXjXNCc5-xRY",
                }}
                vehicle={{
                  make: "Toyota",
                  initialLat: 6.600044,
                  initialLng: 3.33445,
                  model: "Sienna",
                  plateNumber: "ABC - 1234",
                  type: "Van",
                  images: ["/van1.jpg", "/van2.jpg", "/van3.jpg"],
                }}
                eta={6} // estimated minutes
                onCancel={() => console.log("Cancel Ride")}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {" "}
                <Dashboard user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
