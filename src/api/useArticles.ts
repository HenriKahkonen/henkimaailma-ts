import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import { type Language } from "../assets/LanguageContext";

export interface ArticleSummaryTranslation {
    language: Language; /* "fi" | "en" */
    translated_title?: string;
    description?: string;
    translated_video_subtitles: boolean;
}

/**
 * The response item received from the backend. Fields must match exactly
 */
export interface ArticleSummary {
  title: string;
  type: "A" | "E" | "V"; /* Text, External article or Video */
  slug: string;
  category: string;
  content_language: Language;
  description: string;
  published_date: string;
  updated_date?: string;
  tags: { name: string }[]; /* Maybe fix this at backend side to only return strings instead of being nested inside a dict */
  likes: number;
  extras?: Record<string, unknown>;
  translations: ArticleSummaryTranslation[];
  fullTranslations: Language[];
  imgUrl?: string;
  ytid?: string;
  e_url?: string;
}

export interface ArticlesResponse {
  total_articles: number;
  article_pages: number;
  articles: ArticleSummary[];
}

export function useArticles(page: number) {
  return useApiResource<ArticlesResponse>(`articles:page=${page}`, () =>
    fetch(`${api_base_url}/get-articles-list?page=${page}`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}