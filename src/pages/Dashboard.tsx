import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { UserProps } from "../assets/types";

const Dashboard: React.FC<UserProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-1xl font-light text-sky-600">
          Welcome, {user?.role === "pax" ? user.pax.name : "User"}!
        </h1>
        <p className="mt-2 text-gray-600">You’re now logged into rideAble</p>

        <Button onClick={handleLogout} variant="outline">
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
