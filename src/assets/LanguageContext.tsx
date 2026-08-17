import { createContext, useState, useContext } from "react";

/* Global setup for language context */

export type Language = "fi" | "en";

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: {children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("fi");
    return (
        <LanguageContext.Provider value={{ language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}