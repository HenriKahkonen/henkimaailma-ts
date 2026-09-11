import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import { type Language } from "../assets/LanguageContext";

export interface FullArticleTranslation {
    language: Language; /* "fi" | "en" */
    translated_title?: string;
    description?: string;
    ingress?: string;
    body_markdown?: string;
}

export type ArticleType = "A" | "V" | "E";

/**
 * The response item received from the backend. Fields must match exactly
 */
export interface FullArticle {
  title: string;
  type: "A" | "E" | "V"; /* Article, External article or Video */
  slug: string;
  category: string;
  rating?: number;
  content_language: Language;
  published_date: string;
  ingress?: string;
  tags: { name: string }[]; /* Maybe fix this at backend side to only return strings instead of being nested inside a dict */
  likes: number;
  body_markdown?: string;
  extras?: Record<string, unknown>;
  translations: FullArticleTranslation[];
  imgUrl?: string;
  ytid?: string;
  e_url?: string;
}


export function useArticle(articleType: ArticleType, slug: string) {
  const endpoint = articleType === "V" ? "videos" : "articles";

  return useApiResource<FullArticle>(`${endpoint}:slug=${slug}`, () =>
    fetch(`${api_base_url}/${endpoint}/${slug}`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}