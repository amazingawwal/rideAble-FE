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
