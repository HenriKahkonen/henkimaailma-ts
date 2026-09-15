/*import { useState } from "react";*/
import { type FullReview } from "../../api/useReview.ts";
import { useArticle } from "../../api/useArticle";
import { type ArticleType, type FullArticle} from "../../api/useArticle";
import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { getCategoryTranslation } from "./articlesListpage.content.ts";
import { content } from "./articleItemPage.content.ts";
import {motion, AnimatePresence} from 'framer-motion';
import { NavLink, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { remarkCustomDirectives, customMarkdownComponents } from "../../assets/RemarkCustomDirectives.tsx";
import ReactMarkdown from "react-markdown";

/*import youtubeSvg from "../../assets/svg/youtube.svg"*/
/*import articleSvg from "../../assets/svg/article-reader.svg"*/
/*import externalLinkSvg from "../../assets/svg/linkhub.svg"*/
import warningSvg from "../../assets/svg/symbol-exclamation-mark.svg"
/*import heart_unclicked from "../../assets/svg/heart.svg"*/
/*import heart_clicked from "../../assets/svg/heart_full.svg"*/
import Error404page from "../Errorpages/Error404page.tsx";

function ArticlePage({articletype}: {articletype: ArticleType}) {
    const { language } = useLanguage();
    const text = content[language];

    const { slug } = useParams();

    if (!slug) return <Error404page/>
    
    const { data, loading, error } = useArticle(articletype, slug);

    if (loading) return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                <p>{text.loading}</p>
            </motion.div>
        </AnimatePresence>
    )

    /* Maybe handle this more prettily in the future */
    if (error) return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                <div className="errortext">Error: {error}</div>
            </motion.div>
        </AnimatePresence>
    )

    if (!data) return <Error404page /> /* TODO: implement specific page that communicates the fetch failed */

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                {renderArticlePage({data, language})}
            </motion.div>
        </AnimatePresence>
    );

}

interface ArticlePageRenderingProps {
    data : FullArticle | FullReview;
    language : Language;
}

function renderArticlePage({data, language}:ArticlePageRenderingProps) {
  
    const text = content[language]

    const { title, body_markdown, ingress, translation_found} = getFullArticleTranslations({data,language})

    return (
        <>
            <h2>{text.articles_heading}: {title}</h2>
            <NavLink to={text.articlespage_link}>{"<<<"} {text.articlespage_linktext}</NavLink>

            <div className="article-page">

                <div className="article-header-image">
                    <img src={data.imgUrl} />
                </div>
                <div className="article-ingress">
                    {ingress}
                </div>
                <div className="article-metadata">
                    <h2>{title}</h2>
                    <span>{data.published_date}</span>
                    {renderReviewPageTags({data, language})}
                </div>

                <div className="article-prose">
                {renderTranslationMissingWarning({translation_found, language})}

                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkDirective, remarkCustomDirectives]}
                        components={customMarkdownComponents}
                    >
                        {body_markdown}
                    </ReactMarkdown>

                    {/*<div className="article-page-likes-box">
                            <img src={heart_unclicked} />
                            {data.likes} {text.likes}
                    </div>*/}
                </div>


            </div>
        </>
    )
}
interface TranslationWarningProps {
    translation_found: boolean;
    language: Language;
}

function renderTranslationMissingWarning({translation_found,language}: TranslationWarningProps) {
    if (!translation_found) {
        const text = content[language]
        return (
            <div className="article-translation-missing-warn">
                <img src={warningSvg} alt="warning, translation not found"/>
                <div>
                    <b>{text.translation_missing}</b><br/>
                    {text.translation_missing_p2}
                </div>
                
            </div>
        )
    }
}

function getFullArticleTranslations({data, language}:ArticlePageRenderingProps) {
    if (data.content_language === language) {
        return {
            title: data.title,
            body_markdown: data.body_markdown,
            ingress: data.ingress,
            translation_found: true,
        };
    }

    const translation = data.translations.find(
        (t) => t.language === language
    )

    const hasText = (value?: string | null): value is string => Boolean(value?.trim())

    const hasBody = hasText(translation?.body_markdown);
    const hasIngress = hasText(translation?.ingress);
    const translation_found = hasBody && hasIngress;

    return {
        title: translation?.translated_title || data.title,
        body_markdown: hasBody ? translation!.body_markdown : data.body_markdown,
        ingress: hasIngress ? translation!.ingress : data.ingress,
        translation_found,
  };
}


export function renderReviewPageTags({data, language}:ArticlePageRenderingProps) {
    const tags = data.tags
    const category = data.category
    return (
        <div className="article-page-tags">
            <span>{getCategoryTranslation(category,language)}</span>
            {tags.map(
                (tag) => <span>{tag.name}</span>
            )}
        </div>
    )
}



export default ArticlePage