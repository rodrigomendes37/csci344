import React, { useState } from "react";
import { postDataToServer } from "../server-requests.jsx";

export default function AddComment({ token, post, refreshPosts }) {

    const [commentText, setCommentText] = useState("");

    async function handleSubmit() {

        if (!commentText.trim()) {
            return;
        }

        await postDataToServer(token, "/api/comments/", {
            post_id: post.id,
            text: commentText
        });

        setCommentText("");
        refreshPosts();
    }

    return (
        <div className="flex justify-between items-center p-3">
            <div className="flex items-center gap-3 min-w-[80%]">
                <i className="far fa-smile text-lg"></i>
                <input
                    type = "text"
                    value = {commentText}
                    onChange = {(event) => setCommentText(event.target.value)}
                    className = "min-w-[80%] focus:outline-none"
                    placeholder = "Add a comment..."
                />
            </div>
            <button
                className = "text-blue-500 py-2"
                onClick = {handleSubmit}
            >
                Post
            </button>
        </div>
    );
}