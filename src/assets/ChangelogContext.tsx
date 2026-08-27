import { createContext, useState, useContext, useEffect } from "react";
import { type Language } from "./LanguageContext"
import api_base_url from "../config"

export interface ChangelogTranslation {
    language: Language;
    translated_title: string;
    body_markdown: string;
}

export interface ChangelogEntry {
    id: bigint,
    date: string;
    title: string;
    translations: [ChangelogTranslation];
}

interface ChangelogContextValue {
    changelogdata: ChangelogEntry[] | null;
    loading: boolean;
    error: string | null;
}

const ChangelogContext = createContext<ChangelogContextValue | undefined>(undefined);

export function ChangelogProvider({ children }: { children: React.ReactNode }) {
  const [changelogdata, setData] = useState<ChangelogEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (changelogdata !== null) {
        console.log("Data found, returning")   
        return;
    }
    console.log("Making a query for changelog")
    
    let cancelled = false;
    setLoading(true);

    fetch(`${api_base_url}/api/get-changelog/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((json: ChangelogEntry[]) => {
        if (!cancelled) setData(json);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [changelogdata]);

  return (
    <ChangelogContext.Provider value={{ changelogdata, loading, error }}>
      {children}
    </ChangelogContext.Provider>
  );
}

export function useChangelog() {
  const ctx = useContext(ChangelogContext);
  if (!ctx) throw new Error("useChangelog must be used within ChangelogProvider");
  return ctx;
}

