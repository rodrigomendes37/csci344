import React from "react";
import BookmarkButton from "./BookmarkButton.jsx";
import LikeButton from "./LikeButton.jsx";
import AddComment from "./AddComment.jsx";

export default function Post( {post, token, refreshPosts} ){

    return (
        <section className="bg-white border mb-10">
            <div className="p-4 flex justify-between">
                <h3 className="text-lg font-Comfortaa font-bold">{post.user.username}</h3>
                <button className="icon-button">
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>

            <img 
                src={post.image_url} 
                alt={"post image"} 
                width="300" 
                height="300"
                className="w-full bg-cover" 
            />
            <div className="p-4">
                <div className="flex justify-between text-2xl mb-3">
                    <div>
                        <LikeButton
                            token = {token}
                            post = {post}
                            refreshPosts = {refreshPosts}
                        />
                        <button><i className="far fa-comment"></i></button>
                        <button><i className="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        <BookmarkButton 
                            token = {token} 
                            post = {post} 
                            refreshPosts={refreshPosts} 
                        />
                    </div>
                </div>
                <p className="font-bold mb-3">
                    {post.likes ? post.likes.length : 0} likes
                </p>
                <div className="text-sm mb-3">
                    <p>
                        <strong>{post.user.username}</strong> {post.caption}
                    </p>
                </div>
                {post.comments && post.comments.slice(-2).map((comment) => (
                    <p key = {comment.id} className = "text-sm mb-3">
                        <strong>{comment.user.username}</strong> {comment.text}
                    </p>
                ))}
                <p className = "uppercase text-gray-500 text-xs">
                    {post.display_time}
                </p>
            </div>
            <AddComment
                token = {token}
                post = {post}
                refreshPosts = {refreshPosts}
            />
        </section>
    );
}
