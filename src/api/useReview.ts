import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import { type Language } from "../assets/LanguageContext";

export interface FullReviewTranslation {
    language: Language; /* "fi" | "en" */
    translated_title?: string;
    description?: string;
    ingress?: string;
    body_markdown?: string;
}

export type ReviewType = "A" | "V" | "E";

/**
 * The response item received from the backend. Fields must match exactly
 */
export interface FullReview {
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
  extras: Record<string, unknown>;
  translations: FullReviewTranslation[];
  imgUrl?: string;
  ytid?: string;
  e_url?: string;
}


export function useReview(reviewType: ReviewType, slug: string) {
  const endpoint = reviewType === "V" ? "videos" : "articles";

  return useApiResource<FullReview>(`${endpoint}:slug=${slug}`, () =>
    fetch(`${api_base_url}/api/${endpoint}/${slug}`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}