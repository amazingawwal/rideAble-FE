import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Sign-Up";
import Navbar from "./components/Navbar";
import { useState } from "react";
import type { PassengerData } from "./assets/types";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [user, setUser] = useState<PassengerData | null>(null);

  const handleAuthSuccess = (data: PassengerData) => {
    localStorage.setItem("token", data.access_token);
    console.log(data);
    setUser(data);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/login"
            element={<Login onAuthSuccess={handleAuthSuccess} />}
          />
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
