import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { useChangelog, type ChangelogEntry, type ChangelogTranslation } from "../../api/useChangelog.ts"
import { content } from "./Metapage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';

import { SOCIAL_LINKS, CC_BY_Svgs, type CC_BY_SA_Author } from "./Metapage.content.ts";

import { type SocialMediaLink } from "./Metapage.content.ts";

import React from "react";
import ReactMarkdown from "react-markdown";
import Error404page from "../Errorpages/Error404page.tsx";


function Metapage() {
    const { language } = useLanguage();
    const { data, loading, error } = useChangelog();
    const text = content[language];

    if (loading) return (<p>Loading...</p>)
    if (error) return (
        <Error404page /> /* TODO replace with proper error page */
    )

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                <div className="meta-info-box">
                    <h2>{text.contact}</h2>
                    <p>{text.contact_body}</p>
                    <div className="contact-links-box">
                        {SOCIAL_LINKS.map((some) => (
                            <React.Fragment key={some.socialName}>
                                {renderSocialLink(some)}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="cc-by-sa-icons-disclaimer">
                        <h3>{text.ccbysa_disclaimer}</h3>
                        {CC_BY_Svgs.map((author) => (
                            <React.Fragment key={author.author}>
                                {renderSvgIconsList({author, language})}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <h1>{text.changelog_heading}</h1>
                    {data?.map((entry) => (
                        <React.Fragment key = {"Changelog-"+entry.id.toString()}>
                            {renderChangelogEntry({entry},language)}
                        </React.Fragment>
                    ))}
            </motion.div>
        </AnimatePresence>
    );
}

/* Social link rendering */

function renderSocialLink(link: SocialMediaLink) {
  const innercontent = (
    <>
      <img src={link.svg} alt={link.socialName} /> {link.socialName} : {link.linktext}
    </>
  );

  if (link.link === null) {
    return <p key={link.socialName}>{innercontent}</p>
  } else {
    return (
        <a href={link.link}>
            <p key={link.socialName}>
                {innercontent}
            </p>
        </a>
    )
    }
};

/* CC_BY_SA Svg icon disclaimer rendering */ 

interface SvgIconsParams {
    author: CC_BY_SA_Author;
    language: Language;
}

function renderSvgIconsList({author,language}: SvgIconsParams) {
    const text = content[language]
    return (
        <div>
            <div className="svg-icons-showcase">
                {author.icons.map(
                    (icon) => (
                        <img 
                            src={icon.icon} 
                            title={icon.name}
                            alt={icon.name}
                        />
                    )
                )}
            </div>
            <div>{text.ccbysa_authorship_string}{author.author}</div>

        </div>
    )
}

/* Changelog rendering */

function getTranslation(
    entry: ChangelogEntry,
    language: Language)
    : ChangelogTranslation | undefined {
  return (
    entry.translations.find((t) => t.language === language) ??
    entry.translations[0]
  );
}

function renderChangelogEntry({ entry }: {entry: ChangelogEntry}, lang: Language) {
    const translation = getTranslation(entry, lang);

    if (!translation) return null;

    return (
        <article>
            <h2>{translation.translated_title}</h2>
            <time dateTime={entry.date}>{entry.date}</time>
            <ReactMarkdown>{translation.body_markdown}</ReactMarkdown>
        </article>
    )
}

export default Metapage;

