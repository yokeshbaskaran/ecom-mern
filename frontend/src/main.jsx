import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { AdminContextProvider } from "./context/AdminContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <AdminContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
