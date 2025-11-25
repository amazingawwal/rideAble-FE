import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RideProvider } from "./hooks/DriverContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RideProvider>
      <App />
    </RideProvider>
  </StrictMode>,
);
