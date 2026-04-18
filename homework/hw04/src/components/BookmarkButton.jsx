import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests.jsx";

export default function BookmarkButton({ token, post, refreshPosts }) {

    // using the working bookmarks endpoints from the course API
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
        <button 
            onClick = {handleClick}
            role = "switch"
            aria-checked = {!!post.current_user_bookmark_id}
            aria-label = {post.current_user_bookmark_id ? "Remove Bookmark" : "Add Bookmark"}
        >
            {post.current_user_bookmark_id ? (
                <i className = "fas fa-bookmark"></i>
            ) : (
                <i className = "far fa-bookmark"></i>
            )}
        </button>
    );
}