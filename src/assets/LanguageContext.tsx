import { createContext, useState, useContext } from "react";

/* Global setup for language context */
export const LANGUAGES = ["fi", "en"] as const;
export type Language = (typeof LANGUAGES)[number];

/* Path prefixes that should change the language to english */
const ENG_PATH_PREFIXES = ["reviews","other","articles","music"]

interface LanguageContextValue {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: {children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>(getInitialLanguage());
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

function getInitialLanguage(): Language {
    const langDefault = "fi"

    if (typeof window === "undefined") return "fi";

    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");

    if (isSupportedLanguage(langParam)) {
        return langParam
    }

    const pathLang = getLanguageFromPath(window.location.pathname);
    if (pathLang) {
        return pathLang
    }

    return langDefault

}

function isSupportedLanguage(value: string | null): value is Language {
    return (LANGUAGES as readonly string[]).includes(value ?? "");
}

export function getLanguageFromPath(pathname: string): Language | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (!firstSegment) return null;

  if (ENG_PATH_PREFIXES.includes(firstSegment)) return "en";

  return null; // path doesn't imply a language (e.g. root "/")
}