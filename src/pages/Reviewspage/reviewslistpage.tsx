import { useState } from "react";
import { useReviews, type Review, type ReviewTranslation } from "../../api/useReviews.ts";
import { useLanguage, type Language } from "../../assets/LanguageContext.tsx"
import { content, getCategoryTranslation } from "./reviewslistpage.content.ts"
import {motion, AnimatePresence} from 'framer-motion';
import { NavLink } from "react-router-dom";

import youtubeSvg from "../../assets/svg/youtube.svg"
import articleSvg from "../../assets/svg/article-reader.svg"
import externalLinkSvg from "../../assets/svg/linkhub.svg"
import warningSvg from "../../assets/svg/symbol-exclamation-mark.svg"
import heart_unclicked from "../../assets/svg/heart.svg"
import heart_clicked from "../../assets/svg/heart_full.svg"
import fullStar from "../../assets/svg/star.svg"
import halfStar from "../../assets/svg/halfstar.svg"


/*
import React from "react";
import ReactMarkdown from "react-markdown";
*/

function ReviewsListPage() {
    const { language } = useLanguage();
    const [page, setPage] = useState(0);
    const { data, loading, error } = useReviews(page);
    const text = content[language];

    console.log(data)

    if (loading) return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity:0 }}
                animate={{ opacity:1 }}
                exit={{ opacity:0 }}
                transition={{ duration: 0.4, ease: 'easeInOut'}}
            >
                <h1>{text.reviews_heading}</h1>
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
                <h1>{text.reviews_heading}</h1>
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
                    <h1>{text.reviews_heading}</h1>
                    <p>{text.intro}</p>
                    <div className="cardlistflex">
                        {data?.reviews.map((r) => <ReviewCard 
                            key={r.slug} 
                            review={r} 
                            lang={language} />)}
                        <ReviewpagePaginationNavigation pages={data?.total_reviews} />
                    </div>

            </motion.div>
        </AnimatePresence>
    );

}

/* Review list item rendering */

interface ReviewCardProps {
    review : Review;
    lang : Language;
}

function ReviewCard({ review, lang }: ReviewCardProps) {

    const image = review.type === "V" ? getYouTubeThumbnail(review.ytid!) : review.imgUrl;
    const link = getReviewLink(review)
    const icon = review.type === "V" ? youtubeSvg : review.type === "A" ? articleSvg : externalLinkSvg
    
    const {title, desc, translationFound} = getReviewTranslation({review, lang});
    
    return (
            <div className="list-card">

                <div className="card-img-container">
                    <NavLink to={link}>
                        <img 
                            src={image}
                            alt={review.title}
                        >
                        </img>
                    </NavLink>
                </div>

                <div className="card-others">
                    <div className="card-metadata-section">
                        <div className="card-title">
                            <NavLink to={link}>
                                <div>
                                    <h2>{title}</h2>
                                </div>
                            </NavLink>
                        </div>
                        <div className="card-metadata">
                            <NavLink to= {link}>
                                <img src={icon}/>
                            </NavLink>

                            <span>{review.published_date}</span>
                            <div className="card-tags">
                                {displayReviewTags({review,lang})}
                            </div>
                        </div>
                        <div className="card-desc">
                            <span>{desc}</span>
                            {getTranslationMissingWarning({lang,translationFound})}
                        </div>
                    </div>
                    <div className="card-right-corner">
                        <div className="card-rating-box">
                            {/*<span>(Click to show rating)</span>*/}
                            {ReviewRating({review, lang})}
                        </div>
                        <div className="card-likebox">
                            <span>{review.likes}</span>
                            <img src={heart_unclicked} alt="Click to like" />
                        </div>
                    </div>
                </div>

            </div>

    )
}
 
function ReviewRating({review, lang}: ReviewCardProps) {

    const text = content[lang]

    const [isRevealed, setIsRevealed] = useState(false);

    const rating_no = Number(review.extras?.["rating"]);


    if (rating_no === undefined || Number.isNaN(rating_no)) {
        return null
    }

    const fullStars = Math.floor(rating_no / 2)
    const hasHalfStar = rating_no % 2 >= 1;

    console.log(review.title)
    console.log(rating_no)

    return (
        <button
            type="button"
            className="card-rating-box"
            onClick={() => setIsRevealed(true)}
            aria-label={text.show_rating}
        >
            <span className={`rating-text ${isRevealed ? 'hidden' : 'visible'}`}>
                {text.show_rating}
            </span>
        <div className={`rating-stars ${isRevealed ? 'visible' : 'hidden'}`}>
            {Array.from({ length: fullStars }).map((_, i) => (
                <img key={`full-${i}`} src={fullStar} alt="Full star" className="star-icon" />
            ))}
            {hasHalfStar && (
                <img src={halfStar} alt="Half star" className="star-icon" />
            )}
        </div>
        </button>
        /* Return fillstars times image of full star and half_star if rating ends in half star*/
        /* full star <img src=fullStar/>*/
        /* half star <img src=halfStar/>*/
    )
}

function getYouTubeThumbnail(ytid:string) {
    return "https://img.youtube.com/vi/"+ytid+"/maxresdefault.jpg"
}

function getYouTubeVideoLink(ytid:string) {
    return "https://youtu.be/"+ytid
}

interface ReviewDescProps {
    review: Review;
    lang: Language;
}

function displayReviewTags({review, lang}:ReviewDescProps) {
    const tags = review.tags
    const category = review.category
    return (
        <>
            <span className="card-tag-category">{getCategoryTranslation(category,lang)}</span>
            {tags.map(
                (tag) => <span>{tag.name}</span>
            )}
        </>
    )
}

function getReviewLink(review:Review) {
    if (review.e_url!==undefined) {
        return review.e_url
    }
    else if (review.type==="V") {
        return getYouTubeVideoLink(review.ytid!)
    }

    return "/etusivu" /* placeholder */
}



function getReviewTranslation({review, lang}:ReviewDescProps) {
    const translation = review.translations.find(
        (t) => t.language === lang
    )

    const title = translation?.translated_title ?? review.title;
    const desc = translation?.description ?? undefined;

    const translationFound = title !== undefined && desc !== undefined;
    return { title, desc, translationFound };
}

interface TranslationMissingWarningProps {
    lang: Language;
    translationFound: boolean;

}
function getTranslationMissingWarning({lang, translationFound}:TranslationMissingWarningProps) {
    
    const text = content[lang]
    
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


interface ReviewPagePaginationNavigationProps {
    pages? : number | undefined;
}

function ReviewpagePaginationNavigation({ pages }: ReviewPagePaginationNavigationProps) {
    if (pages == null) {
        /* reason to throw err? */
        return null;
    }
    return (
        <div className="paginated-navigation">
            <p>{pages?.toString()}</p>
        </div>
    )
}

export default ReviewsListPage;

