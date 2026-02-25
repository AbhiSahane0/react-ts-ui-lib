/* eslint-disable react-refresh/only-export-components */
//!#Imports: start
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { storage } from "@react-ts-ui-lib/utilities";
//!#Imports: end

//!#Constants: start
//!#Constants: end

//!#Styles: start
//!#Styles: end

//!#helpers: start
//!#helpers: end

//!#propTypes: start
type LanguageContextType = {
  language: string;
  setLanguage: (value: string) => void;
  toggleLanguage: () => void;
};
//!#propTypes: end

//!#Constants: start
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const LANGUAGE_STORAGE_KEY = "app-language";
export const DEFAULT_LANGUAGE = "en" as const;
export const SECONDARY_LANGUAGE = "cz" as const;
const SUPPORTED_LANGUAGES = [DEFAULT_LANGUAGE, SECONDARY_LANGUAGE] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];
//!#Constants: end

//!#helpers: start
const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  !!value && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const stored = storage.get(LANGUAGE_STORAGE_KEY, DEFAULT_LANGUAGE) as string;
    if (isSupportedLanguage(stored)) {
      return stored;
    }
  } catch {
    // ignore and fall back to default
  }

  return DEFAULT_LANGUAGE;
};
//!#helpers: end

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  //!#visualComponent: start
  const [language, setLanguageState] = useState<SupportedLanguage>(
    () => getInitialLanguage(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // persist to local storage
    storage.set(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const setLanguage = (value: string) => {
    if (isSupportedLanguage(value)) {
      setLanguageState(value);
    }
  };

  const toggleLanguage = () =>
    setLanguageState((prev) =>
      prev === DEFAULT_LANGUAGE ? SECONDARY_LANGUAGE : DEFAULT_LANGUAGE,
    );

  //!#render components: start
  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
  //!#render components: end
  //!#visualComponent: end
};

//!#export: start
export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export default LanguageContext;
//!#export: end
