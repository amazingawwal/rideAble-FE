const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
import type {
  HeadersType,
  Pax,
  DriverData,
  VehicleData,
  DriverLogin,
} from "../../assets/types";

export async function apiRequest(
  endpoint: string,
  method = "GET",
  data: Pax | DriverData | VehicleData | DriverLogin,
) {
  const token = localStorage.getItem("authToken");

  const headers: HeadersType = {
    "Content-Type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed");
  }

  return result;
}
