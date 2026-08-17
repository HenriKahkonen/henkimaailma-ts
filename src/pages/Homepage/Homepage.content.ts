import { type Language } from "../../assets/LanguageContext"

interface HomePageContent {
    heading: string,
    intro: string,
    body: string,
}
export const content: Record<Language, HomePageContent> = {
    fi: {
        heading: "Terve maailma!",
        intro: "Alku",
        body: "Keho",
    },
    en: {
        heading: "Hello world!",
        intro: "Intro",
        body: "Body"
    },
};