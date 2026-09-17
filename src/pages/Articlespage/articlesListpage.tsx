import { useState, useEffect } from "react";
import { useArticles, type ArticleSummary, /* type ReviewsResponse, type ReviewTranslation */ } from "../../api/useArticles";
import { type ReviewSummary } from "../../api/useReviews.ts";
import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { content, getCategoryTranslation } from "./articlesListpage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import { NavLink } from "react-router-dom";
import { type HenkimaailmaContentType } from "../../assets/trackPageView.tsx";

import { trackPageView } from "../../assets/trackPageView.tsx";

import youtubeSvg from "../../assets/svg/youtube.svg"
import articleSvg from "../../assets/svg/article-reader.svg"
import externalLinkSvg from "../../assets/svg/linkhub.svg"
import warningSvg from "../../assets/svg/symbol-exclamation-mark.svg"
/* import heart_unclicked from "../../assets/svg/heart.svg" */
/* import heart_clicked from "../../assets/svg/heart_full.svg" */

function ArticlesListPage() {
    const { language } = useLanguage();
    const [page, setPage] = useState(0);
    const { data, loading, error } = useArticles(page);
    const text = content[language];

    useEffect(() => {
      trackPageView({content_type:"genericpage",slug:"articles-page"})
    }, []);

    if (loading) return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                <h1>{text.articles_heading}</h1>
                <p>{text.intro}</p>
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
                <h1>{text.articles_heading}</h1>
                <p>{text.intro}</p>
                <div className="errortext">Error: {error}</div>
            </motion.div>
        </AnimatePresence>
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
                    <h1>{text.articles_heading}</h1>
                    <p>{text.intro}</p>
                    <div className="cardlistflex">
                        {data?.articles.map((r) => <ArticleCard 
                            key={r.slug} 
                            article={r} 
                            lang={language} />)}
                        <ArticlePagePaginationNavigation data={data} pagechanger={setPage} language={language}/>
                    </div>

            </motion.div>
        </AnimatePresence>
    );

}

/* Review list item rendering */

interface ArticleCardProps {
    article : ArticleSummary;
    lang : Language;
}

function ArticleCard({ article, lang }: ArticleCardProps) {

    const image = article.type === "V" ? getYouTubeThumbnail(article.ytid!) : article.imgUrl;
    const link = getArticleCardLink({article,lang})
    const icon = article.type === "V" ? youtubeSvg : article.type === "A" ? articleSvg : externalLinkSvg
    
    const {title, desc, translationFound} = getArticleCardTranslations({article, lang});
    
    const typeMap: Record<string, HenkimaailmaContentType> = {
            V: "video",
            A: "article",
            E: "article",
        }
        
        const contentType: HenkimaailmaContentType = typeMap[article.type]
        const isInternal = article.type === "A";

        const handleClick = () => {
            trackPageView({content_type: contentType, slug:article.slug})
        }

        const linkProps = isInternal
            ? {to: link, onClick: handleClick}
            : {href: link, target: "_blank", rel: "noopener noreferrer", onClick: handleClick};
        const LinkComponent: any = isInternal ? NavLink : "a";

    return (
            <div className="list-card">
                <div className="card-mobile-img-rating-container">
                    <LinkComponent {...linkProps}>
                        <img 
                            src={image}
                            alt={article.title}
                        >
                        </img>
                     </LinkComponent>
                </div>

                <div className="card-img-container">
                    <LinkComponent {...linkProps}>
                        <img 
                            src={image}
                            alt={article.title}
                        >
                        </img>
                    </LinkComponent>
                </div>

                <div className="card-others">
                    <div className="card-metadata-section">
                        <div className="card-title">
                            <LinkComponent {...linkProps}>
                                <div>
                                    <h2>{title}</h2>
                                </div>
                            </LinkComponent>
                        </div>
                        <div className="card-metadata">
                            <LinkComponent {...linkProps}>
                                <img src={icon}/>
                            </LinkComponent>

                            {getCardPublishingDates({object:article,lang})}
                            {/*<span>{article.published_date}</span>*/}
                            
                            <div className="card-tags">
                                {displayCardTags({article,lang})}
                            </div>
                        </div>
                        <div className="card-desc">
                            <span>{desc}</span>
                            {getTranslationMissingWarning({lang,article,translationFound})}
                        </div>
                    </div>
                    <div className="card-right-corner">
                        {/*<div className="card-likebox">
                            <span>{article.likes}</span>
                            <img src={heart_unclicked} alt="Click to like"/>
                        </div>*/}
                    </div>
                </div>

            </div>

    )
}


function getYouTubeThumbnail(ytid:string) {
    return "https://img.youtube.com/vi/"+ytid+"/maxresdefault.jpg"
}

export function getYouTubeVideoLink(ytid:string) {
    return "https://youtu.be/"+ytid
}

interface ArticleCardProps {
    article: ArticleSummary;
    lang: Language;
}

export function displayCardTags({article, lang}:ArticleCardProps) {
    const tags = article.tags
    const category = article.category
    return (
        <>
            <span className="card-tag-category">{getCategoryTranslation(category,lang)}</span>
            {tags.map(
                (tag) => <span>{tag.name}</span>
            )}
        </>
    )
}

function getArticleCardLink({article, lang}:ArticleCardProps) {
    if (article.type==="E" && article.e_url!==undefined) {
        return article.e_url
    }
    else if (article.type==="V") {
        return getYouTubeVideoLink(article.ytid!)
    }

    const ARTICLE_PAGE_LINKS = {
        fi: {
            V: "/kirjoituksia/video/",
            E: "/kirjoituksia/ulkoinen/",
            A: "/kirjoituksia/"
        },
        en: {
            V: "/articles/video/",
            E: "/articles/external/",
            A: "/articles/"
        }

    }

    const articlepageroot = ARTICLE_PAGE_LINKS[lang][article.type]
    const url = articlepageroot+article.slug

    return url
}


function getArticleCardTranslations({article, lang}:ArticleCardProps) {

    if (article.content_language === lang) {
        return {
            title: article.title,
            desc: article.description,
            translationFound: true,
        }
    }

    const translation = article.translations.find(
        (t) => t.language === lang
    )

    /* External articles can only be partially translated (desc). If user language does not match content language, translation cannot exist */
    if (article.type === "E") {
        const title = translation?.translated_title || article.title
        const desc = translation?.description || article.description
        const translationFound = article.content_language === lang ? true : false
        return { title, desc, translationFound }
    }

    /* YouTube video counts as translated if a subtitle translation has been marked to exist */
    if (article.type === "V") {
        const title = translation?.translated_title || article.title
        const desc = translation?.description || article.description
        const translationFound = translation?.translated_video_subtitles || false
        return { title, desc, translationFound }
    }

    const title = translation?.translated_title || article.title
    const desc = article.content_language === lang ? article.description : translation?.description 
    const translationFound = article.content_language === lang ? true : translation !== undefined ? true : false;
    return { title, desc, translationFound };
}

interface TranslationMissingWarningProps {
    lang: Language;
    article: ArticleSummary | ReviewSummary;
    translationFound: boolean;

}
function getTranslationMissingWarning({lang, article, translationFound}:TranslationMissingWarningProps) {
    
    const text = content[lang]
    
    if (article.type==="V" && translationFound && article.content_language !== lang) {
        return (
            <div className="card-translation-missing-warn">
                <img src={warningSvg} alt="warning, translation not found"/>
                <span>{text.translation_video_subtitled}</span>
            </div>
        )
    }
    
    if (!translationFound && article.type==="E") {
        return (
            <div className="card-translation-missing-warn">
                <img src={warningSvg} alt="warning, translation not found"/>
                <span>{text.translation_missing_external}</span>
            </div>
        )
    }

    if (!translationFound) {
        return (
            <div className="card-translation-missing-warn">
                <img src={warningSvg} alt="warning, translation not found"/>
                <span>{text.translation_missing}</span>
            </div>
        )
    }
    else {
        return null
    }
}

interface ArticlePagePaginationProps {
    data: { article_pages: number } | null | undefined;
    pagechanger: (page: number) => void;
    language: Language;
}

function ArticlePagePaginationNavigation({data, pagechanger, language}:ArticlePagePaginationProps) {
    const text = content[language]

    if (data == null) {
        /* reason to throw err? */
        return null;
    }

    return (
        <div className="paginated-navigation">
            <div>{text.page}</div>
            <div>
                {Array.from({ length: data.article_pages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => pagechanger(i)}
                    >
                        {(i + 1).toString()}
                    </button>
                ))}
            </div>
        </div>
    )
}

interface ListCardProps {
    object : ArticleSummary | ReviewSummary
    lang: Language
}

function getCardPublishingDates({object,lang}:ListCardProps) {
    const updated_text: Record<Language, string> = {
        fi: "Päivitetty",
        en: "Updated"
    }
    
    if (!object.updated_date) {
        return (
            <span>{object.published_date}</span>)
    }
    return (
        <>
            <span>{object.published_date}</span>
            <span>({updated_text[lang]}: {object.updated_date})</span>
        </>
    )
}



export default ArticlesListPage;

