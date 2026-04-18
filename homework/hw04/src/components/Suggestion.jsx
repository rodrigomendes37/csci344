import React from "react";

export default function Suggestion({ suggestion }) {
    return (
        <section className="flex justify-between items-center mb-4 gap-2">
            <div className="flex items-center gap-3">
                <img
                    src = {suggestion.thumb_url}
                    alt = {suggestion.username}
                    className = "w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className = "font-bold text-sm">{suggestion.username}</p>
                    <p className = "text-xs text-gray-500">suggested for you</p>
                </div>
            </div>
            <button className = "text-blue-500 text-sm">Follow</button>
        </section>
    );
}