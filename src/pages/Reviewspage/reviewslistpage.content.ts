import { type Language } from "../../assets/LanguageContext"


interface ReviewsPageContent {
    reviews_heading: string,
    intro: string,
    loading: string;
    langWarning?: string;
    translation_missing?: string;
    show_rating: string;
    page: string;
}
export const content: Record<Language, ReviewsPageContent> = {
    fi: {
        reviews_heading: "Arviot",
        intro: "Kirjoittamiani arvioita eri muodoissa",
        loading: "Ladataan arvioita...",
        show_rating: "(Näytä arvosana)",
        page: "Sivu:",
    },
    en: {
        reviews_heading: "Reviews",
        intro: "Reviews I've written in different formats",
        loading: "Loading reviews...",
        translation_missing: "There isn't a translation in your language for this review.",
        show_rating: "(Show rating)",
        page:"Page:",
      },
};


export const REVIEW_CATEGORIES = [    
    "game_review", 
    "film_review", 
    "tv_review", 
    "music_review",
];

export type ReviewCategory = typeof REVIEW_CATEGORIES[number];

export type CategoryTranslation = Record<Language, string>;

export const category_translations: Record<ReviewCategory, CategoryTranslation> = {
  game_review: {
    fi: 'Peliarviot',
    en: 'Game reviews',
  },
  film_review: {
    fi: 'Elokuva-arviot',
    en: 'Film reviews',
  },
  tv_review: {
    fi: 'TV-arviot',
    en: 'TV reviews',
  },
  music_review: {
    fi: 'Musiikkiarviot',
    en: 'Music reviews',
  },
};

export function getCategoryTranslation(
    category: ReviewCategory,
    lang: Language,
    fallbackLang: Language = "fi"
): string {
    const translations = category_translations[category]
    return translations?.[lang] ?? translations?.[fallbackLang] ?? category
}