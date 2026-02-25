//!#Imports: start
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App.tsx";
import { ThemeProvider } from "../src/app/context/ThemeContext";
import { LanguageProvider } from "../src/app/context/LanguageContext";
import { AuthProvider } from "../src/app/context/AuthContext.tsx";
import { storage } from "@react-ts-ui-lib/utilities";
//!#Imports: end

//!#Constants: start
const STORAGE_KEY_DARK_MODE = "app-dark-mode";
const initialDarkMode = storage.get(STORAGE_KEY_DARK_MODE, true);
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
//!#propTypes: end

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <LanguageProvider>
          <ThemeProvider initialDarkMode={initialDarkMode}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
