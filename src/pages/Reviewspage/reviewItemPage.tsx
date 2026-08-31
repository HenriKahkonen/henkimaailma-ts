import { useState } from "react";
import { type FullReview, type FullReviewTranslation } from "../../api/useReview.ts";
import { useReview, type ReviewType } from "../../api/useReview.ts";
import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { getCategoryTranslation } from "./reviewslistpage.content.ts";
import { content } from "./reviewItemPage.content.ts";
import {motion, AnimatePresence} from 'framer-motion';
import { NavLink, useParams } from "react-router-dom";

import youtubeSvg from "../../assets/svg/youtube.svg"
import articleSvg from "../../assets/svg/article-reader.svg"
import externalLinkSvg from "../../assets/svg/linkhub.svg"
import warningSvg from "../../assets/svg/symbol-exclamation-mark.svg"
import heart_unclicked from "../../assets/svg/heart.svg"
import heart_clicked from "../../assets/svg/heart_full.svg"
import fullStar from "../../assets/svg/star.svg"
import halfStar from "../../assets/svg/halfstar.svg"
import Error404page from "../Errorpages/Error404page.tsx";
import ReactMarkdown from "react-markdown";

function ReviewArticlePage({reviewType}: {reviewType: ReviewType}) {
    const { language } = useLanguage();
    const text = content[language];

    const { slug } = useParams();

    if (!slug) return <Error404page/>
    
    const { data, loading, error } = useReview(reviewType, slug);

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
                {renderReviewPage({data, language})}
            </motion.div>
        </AnimatePresence>
    );

}

interface ReviewPageRenderingProps {
    data : FullReview;
    language : Language;
}

function renderReviewPage({data, language}:ReviewPageRenderingProps) {
  
    const text = content[language]

    const { title, body_markdown, ingress, translation_found} = getReviewTranslation({data,language})

    return (
        <>
            <h2>{text.reviews_heading}: {title}</h2>
            <NavLink to={text.reviewspage_link}>{"<<<"} {text.reviewspage_linktext}</NavLink>

            <div className="article-page">

                <div className="article-header-image">
                    <img src={data.imgUrl} />
                </div>
                    {renderTranslationMissingWarning({translation_found, language})}
                <div className="article-ingress">
                    {ingress}
                </div>
                <div className="article-metadata">
                    <h2>{title}</h2>
                    <span>{data.published_date}</span>
                    {renderReviewPageTags({data, language})}
                </div>
                <div className="article-prose">


                    <ReactMarkdown>
                        {body_markdown}
                    </ReactMarkdown>
                    <div className="large-review-score">
                        {renderReviewRating(data)}
                    </div>
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

function getReviewTranslation({data, language}:ReviewPageRenderingProps) {
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


export function renderReviewPageTags({data, language}:ReviewPageRenderingProps) {
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

function renderReviewRating (review:FullReview) {

    const rating_no = Number(review["rating"]);

    const VALID_RATINGS = [0,1,2,3,4,5,6,7,8,9,10];

    if (Number.isSafeInteger(rating_no) && !VALID_RATINGS.includes(rating_no)) {
        const title = review.title
        console.log(`Warning: review "${title}" rating is invalid (${rating_no}). Not displaying rating.`)  
        return null
    }

    if (rating_no === undefined || Number.isNaN(rating_no)) {
        return null
    }

    const fullStars = Math.floor(rating_no / 2)
    const hasHalfStar = rating_no % 2 >= 1;


    return (
        <>
            {Array.from({ length: fullStars }).map((_, i) => (
                <img key={`full-${i}`} src={fullStar} alt="Full star" className="star-icon" />
            ))}
            {hasHalfStar && (
                <img src={halfStar} alt="Half star" className="star-icon" />
            )}
        </>
    )    
}



export default ReviewArticlePage