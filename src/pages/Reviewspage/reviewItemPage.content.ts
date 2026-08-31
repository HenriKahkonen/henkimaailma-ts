import { type Language } from "../../assets/LanguageContext"


interface ReviewsPageContent {
    reviews_heading: string,
    loading: string;
    langWarning?: string;
    translation_missing?: string;
    translation_missing_p2?: string;
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
        translation_missing: "There isn't a translation in your selected language for this review.",
        translation_missing_p2: "This article was written in another language and an appropriate translation was not found. You may, if you wish, attempt to machine translate this text or just take a peek at the rating at the end of the article.",
        show_rating: "(Show rating)",
        rating:"Rating:",
        likes:"likes",
        reviewspage_link: "/reviews",
        reviewspage_linktext: "Back to reviews list",
      },
};