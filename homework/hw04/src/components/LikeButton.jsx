import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests.jsx";

export default function LikeButton({ token, post, refreshPosts }) {

    // The nested likes route listed in the homework returned 404 in testing
    // so this uses th eworking course API likes endpoints instead
    async function handleClick() {
        if (post.current_user_like_id) {
            await deleteDataFromServer(
                token,
                `/api/likes/${post.current_user_like_id}`
            );
        }
        else {
            await postDataToServer(
                token,
                `/api/likes/`,
                {post_id: post.id}
            );
        }

        refreshPosts();
    }

    return (
        <button
            onClick={handleClick}
            role="switch"
            aria-checked={!!post.current_user_like_id}
            aria-label={post.current_user_like_id ? "Unlike post" : "Like post"}
        >
            {post.current_user_like_id ? (
                <i className="fas fa-heart text-red-600"></i>
            ) : (
                <i className="far fa-heart"></i>
            )}
        </button>
    );
}