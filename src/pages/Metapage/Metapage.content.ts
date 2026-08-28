import { type Language } from "../../assets/LanguageContext"

import blueskySvg from "../../assets/svg/bluesky.svg"
import discordSvg from "../../assets/svg/discord.svg"
import githubSvg from "../../assets/svg/github.svg"
import linkedinSvg from "../../assets/svg/linkedin.svg"
import youtubeSvg from "../../assets/svg/youtube.svg"
import emailSvg from "../../assets/svg/email.svg"

interface MetaPageContent {
    changelog_heading: string,
    contact: string,
    contact_body: string;
}
export const content: Record<Language, MetaPageContent> = {
    fi: {
        changelog_heading: "Sivupäivitykset",
        contact: "Yhteystiedot / Some",
        contact_body: "Minut tavoittaa internetistä seuraavista paikoista:"
    },
    en: {
        changelog_heading: "Site changelog",
        contact: "Contact info / Socials:",
        contact_body: "I can be reached online via:",
    },
};

export interface SocialMediaLink {
    socialName : string;
    svg : string; /* imported svg works as a string for some reason */
    link : string | null
    linktext : string,
}

export const SOCIAL_LINKS: SocialMediaLink[] = [
    { socialName : "eMail", svg: emailSvg, link: null, linktext: "henkonenvideo (AT) gmail (DOT) com" },
    { socialName : "YouTube", svg: youtubeSvg, link: "https://www.youtube.com/@henkonen", linktext: "@HenKonen" },
    { socialName : "GitHub", svg: githubSvg, link: "https://github.com/HenriKahkonen", linktext: "HenriKahkonen" },
    { socialName : "LinkedIn", svg: linkedinSvg, link: "https://www.linkedin.com/in/henri-k%C3%A4hk%C3%B6nen/", linktext: "Henri Kähkonen" },
    { socialName : "Discord", svg: discordSvg, link: "https://discord.gg/GPtVSVaVz7", linktext: "Henkimaailma" },
    { socialName : "Bluesky", svg: blueskySvg, link: "https://bsky.app/profile/henkonen.bsky.social", linktext: "@henkonen.bsky.social" },
]