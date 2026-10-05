import { useState } from "react";
import heart_unclicked from "./svg/heart.svg";
import heart_clicked from "./svg/heart_full.svg";
import { toggleLike, getLikedState } from "./likeToggle.ts";
import type { HenkimaailmaContentType } from "./trackPageView.tsx";

interface LikeButtonProps {
  content_type: HenkimaailmaContentType;
  slug: string;
  initialLikes: number;
  cssClass?: string;
  likes_text? : string;
  likes_text_singular? : string;
}

function LikeButton({ content_type, slug, initialLikes, cssClass, likes_text, likes_text_singular }: LikeButtonProps) {
  const [liked, setLiked] = useState(() => getLikedState(content_type, slug));
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    if (pending) return; // guard against rapid double-clicks firing overlapping requests
    setPending(true);

    const result = await toggleLike({ content_type, slug });
    if (result) {
      setLiked(result.liked);
      setLikes(result.likes);
    }
    // On failure (result === null), state intentionally stays unchanged —
    // the heart doesn't flip if we don't know the server's actual state.

    setPending(false);
  };


  return (
    <div className={cssClass}>
      <span>{likes} {likes===1 ? likes_text_singular : likes_text}</span>
      <img
        src={liked ? heart_clicked : heart_unclicked}
        alt={liked ? "Click to unlike" : "Click to like"}
        onClick={handleClick}
        style={{ cursor: pending ? "default" : "pointer", opacity: pending ? 0.6 : 1 }}
      />
    </div>
  );
}

export default LikeButton;