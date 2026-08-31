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
    const translation = data.translations.find(
        (t) => t.language === language
    )

    const review_title = data.content_language === language ? data.title : translation?.translated_title
    const review_markdown = data.content_language === language ? data.body_markdown : translation?.body_markdown
    const review_ingress = data.content_language === language ? data.ingress : translation?.ingress

    return (
        <>
            <NavLink to={text.reviewspage_link}>{"<<<"} {text.reviewspage_linktext}</NavLink>
            <h1>{review_title}</h1>

            <div className="article-page">

                <div className="article-header-image">
                    <img src={data.imgUrl} />
                </div>
                <div className="article-ingress">
                    {review_ingress}
                </div>
                <div className="article-metadata">
                    <h2>{review_title}</h2>
                    <span>{data.published_date}</span>
                    {renderReviewPageTags({data, language})}
                </div>
                <div className="article-prose">
                    <ReactMarkdown>
                        {review_markdown}
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

interface ReviewPageTagsProps {
    data : FullReview,
    language: Language
}

export function renderReviewPageTags({data, language}:ReviewPageTagsProps) {
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