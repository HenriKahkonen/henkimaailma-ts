import api_base_url from "../config";
import { useApiResource } from "./useApiResource";
import { type Language } from "../assets/LanguageContext";

export interface ReviewTranslation {
    language: Language; /* "fi" | "en" */
    translated_title?: string;
    description?: string;
    translated_video_subtitles: boolean;
}

/**
 * The response item received from the backend. Fields must match exactly
 */
export interface Review {
  title: string;
  type: "A" | "E" | "V"; /* Article, External article or Video */
  slug: string;
  category: string;
  rating?: number;
  content_language: Language;
  description: string;
  published_date: string;
  tags: { name: string }[]; /* Maybe fix this at backend side to only return strings instead of being nested inside a dict */
  likes: number;
  extras: Record<string, unknown>;
  translations: ReviewTranslation[];
  fullTranslations: Language[];
  imgUrl?: string;
  ytid?: string;
  e_url?: string;
}

export interface ReviewsResponse {
  total_reviews: number;
  review_pages: number;
  reviews: Review[];
}

export function useReviews(page: number) {
  return useApiResource<ReviewsResponse>(`reviews:page=${page}`, () =>
    fetch(`${api_base_url}/get-reviews-list?page=${page}`).then((res) => {
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return res.json();
    })
  );
}