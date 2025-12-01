import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../assets/types";
import Spinner from "./Spinner";
import { useUser } from "../hooks/user/userContext";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  loading,
}) => {
  const {user} = useUser()
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }
  // const token = localStorage.getItem("token");

  if (!user ) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
