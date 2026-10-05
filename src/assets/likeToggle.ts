// likeToggle.ts
import api_base_url from "../config";
import type { HenkimaailmaContentType } from "./trackPageView";

interface LikeToggleProps {
  content_type: HenkimaailmaContentType;
  slug: string;
}

interface LikeToggleResponse {
  liked: boolean;
  likes: number;
}

const STORAGE_KEY_PREFIX = "liked:";
function storageKey(content_type: string, slug: string): string {
  return `${STORAGE_KEY_PREFIX}${content_type}:${slug}`;
}

/**
 * Check localStorage to see whether or not this browser and user has previously liked an object.
 * Server's LikeEvent table is the actual source of truth - local check is made to display the correct UI element
 */
export function getLikedState(content_type: string, slug: string): boolean {
  try {
    return localStorage.getItem(storageKey(content_type, slug)) === "true";
  } catch {
    // localStorage can throw in some private-browsing modes — fail closed.
    return false;
  }
}
/**
 * Update local storage to have the correct info on whether or not an item has been liked
 */
function setLikedState(content_type: string, slug: string, liked: boolean): void {
  try {
    localStorage.setItem(storageKey(content_type, slug), String(liked));
  } catch {
    // Non-fatal: worst case, heart state doesn't persist across visits.
  }
}

/**
 * POST function that toggles a like on an object (like if not yet liked by this
 * browser, unlike if already liked). Returns the server's authoritative new
 * liked-state and count, which the caller should use to update the UI —
 * don't assume optimistically, since the server's view of "already liked"
 * (IP+UA hash) and localStorage can drift if storage is cleared.
 * @param content_type "article" | "video" | "other" |"soundsandscapespack" | "musicrelease"
 * @param slug the slug value of the content being liked
 */
export async function toggleLike({ content_type, slug }: LikeToggleProps): Promise<LikeToggleResponse | null> {
    
    if (content_type === "genericpage") {
        console.warn("Genericpages can't be liked!")
        return null
    }

    try {
        const res = await fetch(`${api_base_url}/like/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: content_type, slug }),
        });

        if (!res.ok) {
        console.warn("toggleLike failed:", res.status, await res.text());
        return null;
        }

        const data: LikeToggleResponse = await res.json();
        setLikedState(content_type, slug, data.liked);
        return data;
        
    } catch (err) {
    console.warn("toggleLike failed:", err);
    return null;
  }
}