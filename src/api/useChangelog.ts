import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import type { Language } from "../assets/LanguageContext";

export interface ChangelogTranslation {
  language: Language;
  translated_title: string;
  body_markdown: string;
}

export interface ChangelogEntry {
  id: number;
  date: string;
  title: string;
  translations: ChangelogTranslation[];
}

export function useChangelog() {
  return useApiResource<ChangelogEntry[]>("changelog", () =>
    fetch(`${api_base_url}/api/get-changelog/`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}