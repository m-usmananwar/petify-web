import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToasterProvider } from "./context/ToasterContext.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ToasterProvider>
    <App />
    <ToastContainer />
  </ToasterProvider>
  // </StrictMode>
);
