import { type Language } from "../../assets/LanguageContext"

interface HomePageContent {
    heading: string,
    intro: string,
    par1: string,
    par2: string,
    finalPar: string,
    langWarning?: string;

}
export const content: Record<Language, HomePageContent> = {
    fi: {
        heading: "Terve, ihminen!",
        intro: "Olet löytänyt Henkan l. **Henri Kähkösen** kotisivut. Tervetuloa!",
        par1: "Olen musiikkitieteilijä, ohjelmoija, mediakriitikko, sisällöntuottaja, muusikko, peli-intoilija ja muitakin asioita tarpeen tullen. Rakastan kaikkea taiteesta, tietokoneista, ohjelmoinnista ja videopeleistä nördäämistä, ja tämä sivu on minun näille asioille internetistä valtaamani kulma.",
        par2: "",
        finalPar: "Kokoan tälle sivulle erilaisia projektejani ja luomuksiani. Toivottavasti nautit!",
    },
    en: {
        heading: "Hello, you!",
        intro: "You've found the homepage of Henkka, AKA Henri Kähkönen. Welcome!",
        par1: "I am a musicologist, a programmer, a media critic, a content creator, musician, game enthusiast and other things depending on the situation. I love nerding out about arts, computers, programming and video games, and this page is my little corner in the internet dedicated to these values.",
        par2: "",
        finalPar: "This site will serve as an aggreate portal of all of my projects and creations. I hope you'll enjoy!",
        langWarning: "(Note that while some pages on this page are available in English, the majority of the content I push online is aimed at a Finnish target audience and is available only in Finnish. I don't want to restrict site content based on a content language / reader language mismatch, but I'll try and flag things that are not available in your selected language.)"
    },
};