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
        par1: "Rakastan kaikkea taidetta ja tietokoneista, ohjelmoinnista ja videopeleistä nördäämistä (tosin pelithän jo sisältyvät taiteiden kategoriaan). Olen koulutukseltani musiikkitieteilijä sivuaineenaan tietojenkäsittelytiede, ja tämä sivusto on rakentamani oma kulmani internetissä.",
        par2: "",
        finalPar: "Kokoan tälle sivulle erilaisia projektejani ja luomuksiani. Toivottavasti nautit!",
    },
    en: {
        heading: "Hello, you!",
        intro: "You've found the homepage of Henkka, AKA Henri Kähkönen. Welcome!",
        par1: "I love arts and nerding out about computers, programming and video games (though they fall into the arts category). By education I am a musicologist that minored in computer science, and this page is a little corner in the internet I crafted for myself.",
        par2: "",
        finalPar: "This site will serve as an aggreate portal of all of my projects and creations. I hope you'll enjoy!",
        langWarning: "(Note that while some pages on this page are available in English, the majority of the content I push online is aimed at a Finnish target audience and is available only in Finnish. I don't want to restrict site content based on a content language / reader language mismatch, but I'll try and flag things that are not available in your selected language.)"
    },
};