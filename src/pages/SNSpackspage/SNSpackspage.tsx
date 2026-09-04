import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { useSnsData, type SnSChangelogEntry, type SnSPack } from "../../api/useSnSData.ts"
import { content, licences, type FAQItem, type LicenceInfo } from "./SNSpackspage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';

import /*React,*/ { useState } from "react";
import ReactMarkdown from "react-markdown";


function SnSPage() {
    const { language } = useLanguage();
    const { data, loading, error } = useSnsData();
    const text = content[language];

    if (loading) { return <p>{text.loading}</p>}
    if (error) { return <div className="errortext">Error: {error}</div>}
    if (!data) { return <div className="errortext">Error: {error}</div>}

    const packs = data.packs
    const changelog = data.sns_cl
    console.log(data)

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
            <div className="sns-page">
                <h1>{text.sns_heading}</h1>
                <ReactMarkdown>
                    {text.sns_body}
                </ReactMarkdown>

                <div className="faq-section">
                    <h2>{text.faq_heading}</h2>
                    {text.faq.map((faq) => (
                        <FAQQuestion key={faq.q} faq={faq} />
                    ))}
                    </div>

                <div className="faq-section">
                    <h2>{text.licences_heading}</h2>
                    {licences.map((licence) => (
                        <LicenceInfoItem key={licence.abbreviation} licence={licence} language={language} />
                    ))}
                    </div>

                <h2>{text.sns_heading}</h2>
                <div className="sns-packs-list">
                    {packs.map((snspack) => (
                        <SnsPackCard key={snspack.slug} snspack={snspack} language={language} />
                    ))}
                </div>

                <h2>Changelog</h2>
                    <div>
                        {changelog.map((entry) => (
                            <SnSChangelogEntry key = {"Changelog-"+entry.title.toString()} entry = {entry} language={language} />
                        ))}
                    </div>

            </div>
            </motion.div>
        </AnimatePresence>
    );
}

function FAQQuestion({faq}:{faq:FAQItem}) {
    return (
        <>
            <div className="faq-question-q">
                <ReactMarkdown>{faq.q}</ReactMarkdown>
            </div>
            <div className="faq-question-a">
                <ReactMarkdown>{faq.a}</ReactMarkdown>
            </div>
        </>
    )
}

interface LicenceInfoProps {
    language : Language;
    licence: LicenceInfo;
} 

function LicenceInfoItem({ language, licence }: LicenceInfoProps) {
    return (
        <>
            <div className="faq-question-q">
                {licence.info_link ? (
                    <a href={licence.info_link}>
                        {licence.abbreviation}: {licence.name}
                    </a>
                ) : (
                    <>{licence.abbreviation}: {licence.name}</>
                )}
            </div>
            <div className="faq-question-a">
                <ReactMarkdown>{licence.description[language]}</ReactMarkdown>
            </div>
        </>
    );
}

interface SnSChangelogEntryProps {
    entry: SnSChangelogEntry;
    language: Language;
}
function SnSChangelogEntry({ entry, language }: SnSChangelogEntryProps) {
    const translation = entry.translations.find((t) => t.language === language) ??
    entry.translations[0]

    if (!translation) return null;

    const title = (translation.title === "" || translation.title === "undefined") ? entry.title : translation.title;
    const markdown= translation.body_markdown

    return (
        <article>
            <h2>{title}</h2>
            <time dateTime={entry.date}>{entry.date}</time>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
    )
}

interface SnSPackCardProps {
    snspack : SnSPack;
    language: Language;
}

function SnsPackCard({ snspack, language }: SnSPackCardProps) {
    const text = content[language];
    const desc = snspack.translations.find((t) => t.language === language);

    const updated_date = (snspack.release_date === snspack.updated_date) ? null : (
        <>({text.updated} {snspack.updated_date})</>
    );

    return (
        <div className="sns-pack-card">
            <div className="sns-card-divider">
                <div className="sns-metadata-side">
                    <a href={snspack.e_url}>
                        <div className="sns-pack-downloadbutton">
                            <div className="sns-pack-image">
                                <img src={snspack.imgUrl} alt={snspack.title} />
                            </div>
                            <div className="sns-pack-button-texts">
                                <h2>{text.download}: {snspack.title}</h2>
                            </div>
                        </div>
                    </a>
                    <div className="sns-metadata">
                        <h2>{snspack.title}</h2>

                        <div className="sns-releasedate">
                            <span>{snspack.release_date.toString()}</span>
                            <span>{updated_date}</span>
                        </div>

                        <div className="sns-licence-tag">
                            {text.licence}: {snspack.licence}
                        </div>
                        <div className="sns-card-tags">
                            {renderSnsCardtags(snspack)}
                        </div>

                    </div>
                </div>

                <div className="sns-description-side">
                    <p>{desc?.description}</p>
                </div>
            </div>

            <div className="sns-file-list">
                {/* Rendered as JSX standard element */}
                <SnsPackFileList snspack={snspack} language={language} />
            </div>
        </div>
    );
}

function renderSnsCardtags(snspack:SnSPack) {
    const tags = snspack.tags
    return (
        <>
            {tags.map(
                (tag) => <span>{tag.name}</span>
            )}
        </>
    )
}

function SnsPackFileList({ snspack, language }: SnSPackCardProps) {
    const text = content[language];
    const [isRevealed, setIsRevealed] = useState(false);
    const file_list = snspack.file_list;

    return (
        <button
            type="button"
            className="sns-filelist-display-button"
            onClick={() => setIsRevealed(true)}
            aria-label={text.show_file_list}
        >
            <span className={`sns-file-list ${isRevealed ? 'hidden' : 'visible'}`}>
                <h3>{text.show_file_list}</h3>
            </span>
            <div className={`sns-file-list ${isRevealed ? 'visible' : 'hidden'}`}>
                <ul>
                    {file_list.map((filename, index) => (
                        <li key={`${filename}-${index}`}>{filename}</li>
                    ))}
                </ul>
            </div>
        </button>
    );
}


export default SnSPage

