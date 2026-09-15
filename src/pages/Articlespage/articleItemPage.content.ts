import { type Language } from "../../assets/LanguageContext"


interface ReviewsPageContent {
    articles_heading: string;
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
    articlespage_link : string;
    articlespage_linktext: string;
}
export const content: Record<Language, ReviewsPageContent> = {
    fi: {
        articles_heading: "Kirjoitukset",
        reviews_heading: "Arvio",
        loading: "Ladataan arviota...",
        show_rating: "(Näytä arvosana)",

        rating: "Arvosana:",
        likes: "tykkäystä",

        reviewspage_link: "/arviot",
        reviewspage_linktext: "Takaisin arviolistaan",
        articlespage_link: "/kirjoituksia",
        articlespage_linktext: "Takaisin kirjoituksiin",
    },
    
    en: {
        articles_heading: "Articles",
        reviews_heading: "Review",
        loading: "Loading review...",
        translation_missing: "There isn't a translation in your selected language for this article.",
        translation_missing_p2: "This article was written in another language and an appropriate translation was not found.",
        show_rating: "(Show rating)",

        rating:"Rating:",
        likes:"likes",

        reviewspage_link: "/reviews",
        reviewspage_linktext: "Back to reviews list",
        articlespage_link: "/articles",
        articlespage_linktext: "Back to articles",
      },
};