/* eslint-disable react-refresh/only-export-components -- context file exports Provider and useTheme hook */
//!#Imports: start
import { createContext, useContext, useState, type ReactNode } from "react";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
  initialDarkMode?: boolean;
};
//!#propTypes: end

//!#Constants: start
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
//!#Constants: end

export const ThemeProvider = ({
  children,
  initialDarkMode = true,
}: ThemeProviderProps) => {
  //!#visualComponent: start
  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  //!#render components: start
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};

export default ThemeContext;
//!#export: end
