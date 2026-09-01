import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import type { Language } from "../assets/LanguageContext";

export interface SnsPackDescription {
    language: Language;
    description: string;
}

export interface SnSPack {
    title: string;
    slug: string;
    imgUrl: string;
    e_url: string;
    licence: string;
    tags: { name: string }[];
    release_date: string;
    updated_date: string;
    likes: Number;
    translations: SnsPackDescription[];
    file_list: string[];
}

export interface SnSChangelogTranslation {
    language: Language;
    title: string;
    body_markdown: string;
}

export interface SnSChangelogEntry {
    date: string;
    title: string;
    translations: SnSChangelogTranslation[];
}

export interface SnsDataResponse {
    packs: SnSPack[];
    sns_cl: SnSChangelogEntry[];
}

export function useSnsData() {
  return useApiResource<SnsDataResponse>("sns-data", () =>
    fetch(`${api_base_url}/api/get-sns-data/`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}