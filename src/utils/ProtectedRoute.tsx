import { Navigate } from "react-router-dom";
import type { ProtectedRouteProps } from "../assets/types";

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
