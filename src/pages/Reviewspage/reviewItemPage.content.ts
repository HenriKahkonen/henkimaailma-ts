import { type Language } from "../../assets/LanguageContext"


interface ReviewsPageContent {
    reviews_heading: string,
    loading: string;
    langWarning?: string;
    translation_missing?: string;
    rating: string;
    show_rating: string;
    likes: string;
    reviewspage_link : string;
    reviewspage_linktext: string;
}
export const content: Record<Language, ReviewsPageContent> = {
    fi: {
        reviews_heading: "Arvio",
        loading: "Ladataan arviota...",
        show_rating: "(Näytä arvosana)",
        rating: "Arvosana:",
        likes: "tykkäystä",
        reviewspage_link: "/arviot",
        reviewspage_linktext: "Takaisin arviolistaan",
    },
    en: {
        reviews_heading: "Review",
        loading: "Loading review...",
        translation_missing: "There isn't a translation in your language for this review.",
        show_rating: "(Show rating)",
        rating:"Rating:",
        likes:"likes",
        reviewspage_link: "/reviews",
        reviewspage_linktext: "Back to reviews list",
      },
};