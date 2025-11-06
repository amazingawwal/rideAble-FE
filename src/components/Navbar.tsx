import { useNavigate } from "react-router-dom";
import type { PassengerData } from "../assets/types";

export default function Navbar({user}: {
  user: PassengerData | null;
}) {
  const navigate = useNavigate();

  return (
    <header className="flex sticky top-0 z-50 items-center justify-between px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="text-sky-600 w-8 h-8">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h1 className="text-2xl tracking-tight font-bold text-center">
          ride<span className="text-sky-500 ">Able</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {user? <h1 className="text-2xl font-light text-sky-600">
          Welcome, {user?.pax.name || "User"}!
        </h1>:<button
          onClick={() => navigate("/driver/login")}
          className="px-4 py-2 rounded-b-lg border border-sky-500 text-sky-600 font-medium hover:bg-sky-100 transition"
        >
          Driver
        </button>}
      </div>
    </header>
  );
}
