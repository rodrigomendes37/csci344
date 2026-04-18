import React, { useEffect, useState } from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Stories({ token }) {
    
    const [stories, setStories] = useState([]);

    async function getStories() {
        const data = await getDataFromServer(token, "/api/stories");
        setStories(data);
    }

    useEffect(() => {
        getStories();
    }, []);

    return (
        <header className="flex gap-6 bg-white border p-4 overflow-x-auto mb-6">
            {stories.map((story) => (
                <div key = {story.id} className="flex flex-col items-center min-w-[70px]">
                    <img
                        src = {story.user.thumb_url}
                        alt = {story.user.username}
                        className = "w-14 h-14 rounded-full object-cover border-2 border-pink-400 p-[2px]"
                    />
                    <p className = "text-xs mt-1">{story.user.username}</p>
                </div>
            ))}
        </header>
    );
}