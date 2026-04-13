import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests.jsx";

export default function BookmarkButton({ token, post, refreshPosts }) {

    async function handleClick(){

        if(post.current_user_bookmark_id) {
            await deleteDataFromServer(
                token, 
                `/api/bookmarks/${post.current_user_bookmark_id}`
            );
        }
        else {
            await postDataToServer(token, "/api/bookmarks/", {
                post_id: post.id
            });
        }

        refreshPosts();
    }

    return (
        <button onClick = {handleClick}>
            {post.current_user_bookmark_id ? (
                <i className = "fas fa-bookmark"></i>
            ) : (
                <i className = "far fa-bookmark"></i>
            )}
        </button>
    );
}