import { type Language } from "../../assets/LanguageContext"

import blueskySvg from "../../assets/svg/bluesky.svg"
import discordSvg from "../../assets/svg/discord.svg"
import githubSvg from "../../assets/svg/github.svg"
import linkedinSvg from "../../assets/svg/linkedin.svg"
import youtubeSvg from "../../assets/svg/youtube.svg"
import emailSvg from "../../assets/svg/email.svg"

import heartSvg from "../../assets/svg/heart.svg"
import articleSvg from "../../assets/svg/article-reader.svg"
import warningSvg from "../../assets/svg/symbol-exclamation-mark.svg"
import linkSvg from "../../assets/svg/linkhub.svg"

import starSvg from "../../assets/svg/star.svg"
import halfstarSvg from "../../assets/svg/halfstar.svg"
import fullheartSvg from "../../assets/svg/heart_full.svg"


interface CC_BY_SA_Svg {
    icon : string;
    name : string;
}

export interface CC_BY_SA_Author {
    author : string;
    icons : CC_BY_SA_Svg[];
}

export const CC_BY_Svgs: CC_BY_SA_Author[] = [
        {
            author : "Donnnno",
            icons : [
                { icon: blueskySvg, name:"bluesky" },
                { icon: discordSvg, name: "discord" },
                { icon: githubSvg, name: "github" },
                { icon: linkedinSvg, name: "linkedin" },
                { icon: youtubeSvg, name: "youtube" },
                { icon: emailSvg, name: "huawei-email" },

                /*{ icon: heartSvg, name: "heart" },*/
                { icon: articleSvg, name: "article-reader" },
                { icon: warningSvg, name: "symbol-exclamation-mark" },
                { icon: linkSvg, name: "linkhub" },
            ]
        },
        {
            author : "Henri Kähkönen (based on designs of Donnnno)",
            icons : [
                { icon : starSvg, name :"star"},
                { icon : halfstarSvg, name :"halfstar"},
                /*{ icon : fullheartSvg, name :"filled-heart"},*/
            ]
        },

]

interface MetaPageContent {
    changelog_heading: string,
    contact: string,
    contact_body: string;
    ccbysa_disclaimer: string;
    ccbysa_authorship_string: string;
}
export const content: Record<Language, MetaPageContent> = {
    fi: {
        changelog_heading: "Sivupäivitykset",
        contact: "Yhteystiedot / Some",
        contact_body: "Minut tavoittaa internetistä seuraavista paikoista:",
        ccbysa_disclaimer: "Tällä sivustolla käytetään seuraavia CC-BY-SA -lisenssillä jaeltuja ikoneita:",
        ccbysa_authorship_string: "Tekijä: "
    },
    en: {
        changelog_heading: "Site changelog",
        contact: "Contact info / Socials:",
        contact_body: "I can be reached online via:",
        ccbysa_disclaimer: "This website uses the following icons distributed via the CC-BY-SA licence:",
        ccbysa_authorship_string: "By: "
    },
};

export interface SocialMediaLink {
    socialName : string;
    svg : string; /* imported svg works as a string for some reason */
    link : string | null
    linktext : string,
}

/* SVGs are part of Arcticons collection https://opensvg.dev/icons/arcticons */
/*TODO: credit the makers of icons in meta page */
export const SOCIAL_LINKS: SocialMediaLink[] = [
    { socialName : "eMail", svg: emailSvg, link: null, linktext: "henkonenvideo (AT) gmail (DOT) com" },
    { socialName : "YouTube", svg: youtubeSvg, link: "https://www.youtube.com/@henkonen", linktext: "@HenKonen" },
    { socialName : "GitHub", svg: githubSvg, link: "https://github.com/HenriKahkonen", linktext: "HenriKahkonen" },
    { socialName : "LinkedIn", svg: linkedinSvg, link: "https://www.linkedin.com/in/henri-k%C3%A4hk%C3%B6nen/", linktext: "Henri Kähkonen" },
    { socialName : "Discord", svg: discordSvg, link: "https://discord.gg/GPtVSVaVz7", linktext: "Henkimaailma" },
    { socialName : "Bluesky", svg: blueskySvg, link: "https://bsky.app/profile/henkonen.bsky.social", linktext: "@henkonen.bsky.social" },
]