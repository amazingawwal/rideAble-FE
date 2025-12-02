import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ fallback }: { fallback?: string }) {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.length > 1) {
      navigate(-1);
    } else if (fallback) {
      navigate(fallback);
    }
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 p-2 text-gray-700 hover:text-black"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
}
