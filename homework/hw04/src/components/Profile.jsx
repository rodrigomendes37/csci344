import React, { useEffect, useState } from "react";
import { getDataFromServer } from "../server-requests.jsx";

export default function Profile({ token }) {
    
    const [profile, setProfile] = useState(null);

    async function getProfile() {
        const data = await getDataFromServer(token, "/api/profile");
        setProfile(data);
    }

    useEffect(() => {
        getProfile();
    }, []);

    if (!profile) {
        return <header className="flex gap-4 items-center">Loading profile...</header>;
    }

    return (
        <header className="flex gap-4 items-center">
            <img
                src={profile.thumb_url}
                alt={profile.username}
                className="w-14 h-14 rounded-full object-cover"
            />
            <div>
                <p className="font-bold text-sm">{profile.username}</p>
                <p className="text-sm text-gray-500">{profile.first_name} {profile.last_name}</p>
            </div>
        </header>
    );
}