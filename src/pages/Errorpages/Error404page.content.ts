import { type Language } from "../../assets/LanguageContext"

interface HomePageContent {
    heading: string,
    intro: string,
    body: (path:string) => string,
}
export const content: Record<Language, HomePageContent> = {
    fi: {
        heading: "404",
        intro: "Oletkohan eksynyt?",
        body: (path) => `Sivua ${path} ei löytynyt.`,
    },
    en: {
        heading: "404",
        intro: "Might you be lost?",
        body: (path) => `The page ${path} was not found.`,    },
};