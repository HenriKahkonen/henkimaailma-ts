import { type Language } from "../../assets/LanguageContext"


interface ArticlesPageContent {
    articles_heading: string,
    intro: string,
    loading: string;
    langWarning?: string;
    translation_missing?: string;
    translation_video_subtitled?: string;
    translation_missing_external?: string;
    page: string;
}
export const content: Record<Language, ArticlesPageContent> = {
    fi: {
        articles_heading: "Kirjoituksia",
        intro: "Videoesseet, blogikirjoitukset, vlogit, kommentaarit ynnä muut.",
        loading: "Ladataan kirjoituksia...",
        page: "Sivu:",
    },
    en: {
        articles_heading: "Articles",
        intro: "Video essays, blog posts, vlogs, commentaries and other.",
        loading: "Loading articles...",
        translation_missing: "There isn't a translation in your language for this article.",
        translation_video_subtitled: "This video is spoken in a different language than yours, but it's subtitled in your chosen language.",
        translation_missing_external: "This review is hosted elsewhere and its full text is not available in your language.",
        page:"Page:",
      },
};


export const ARTICLE_CATEGORIES = [    
    "blog", 
    "vlog",
    "video_essay",
    "project_writeup",
    "commentary",
];

export type ReviewCategory = typeof ARTICLE_CATEGORIES[number];

export type CategoryTranslation = Record<Language, string>;

export const category_translations: Record<ReviewCategory, CategoryTranslation> = {
  blog: {
    fi: 'Blogi',
    en: 'Blog',
  },
  vlog: {
    fi: 'Vlogi',
    en: 'Vlog',
  },
  video_essay: {
    fi: 'Videoessee',
    en: 'Video essay',
  },
  commentary: {
    fi: 'Kommentaari',
    en: 'Commentary'
  },
  project_writeup: {
    fi: 'Projektiraportti',
    en: 'Project report'
  }
};

export function getCategoryTranslation(
    category: ReviewCategory,
    lang: Language,
    fallbackLang: Language = "fi"
): string {
    const translations = category_translations[category]
    return translations?.[lang] ?? translations?.[fallbackLang] ?? category
}