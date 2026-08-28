import { type Language } from "../../assets/LanguageContext"

interface OtherstuffPageContent {
    heading: string,
    intro: string,


}
export const content: Record<Language, OtherstuffPageContent> = {
    fi: {
        heading: "Kaikkea muuta",
        intro: "Tämä sivu on vielä työn alla. Palaahan myöhemmin!",},
    en: {
        heading: "Other stuff",
        intro: "This part of the site is still under construction. Come back later!",
},
};