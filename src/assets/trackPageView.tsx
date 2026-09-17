import api_base_url from "../config";

export type HenkimaailmaContentType = "genericpage" | "article" | "video" | "other" |"soundsandscapespack" | "musicrelease";

interface PageViewTrackingProps {
    content_type : HenkimaailmaContentType
    slug : string;
}

// List to standardize the generic pages' slugs 
const GENERIC_PAGE_SLUGS = [
    "index-page",
    "portfolio-page",
    "meta-page",
    "sns-page",
    "reviews-page",
    "articles-page",
    //"music-page",
    //"others-page",
]

/**
 * POST function that hits an endpoint in the API that tracks unique page visits. User data (e.g. IP address) is anonymized server-side.
 * @param content_type genericpage | video | article or other content of type HenkimaailmaContentType
 * @param slug the slug value of the content to track. If content_type is genericpage, the passed slug needs to be sensible and constant coming from client-side as to avoid counting page visits in multiple places after code changes. 
 */
export async function trackPageView({ content_type, slug }:PageViewTrackingProps): Promise<void> {
    try {
        if (content_type === "genericpage") {
            if (GENERIC_PAGE_SLUGS.indexOf(slug)===-1) {
                throw TypeError(`Slug ${slug} is not a recognized generic page slug.`)
            }
        }
        await fetch(`${api_base_url}/analytics/`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({model: content_type, slug}),
            keepalive: true
        });
    } catch (err) {
        // All errors supressed: counting views not important enough to be shown to the site user as an error
        console.warn("trackPageView failed: ",err)
    }
} 

