import React, {useState, useEffect} from "react";
import { getDataFromServer } from "../server-requests.jsx";
import Suggestion from "./Suggestion.jsx";

export default function Suggestions({ token }) {

    const [suggestions, setSuggestions] = useState([]);

    async function getSuggestions(){
        const data = await getDataFromServer(token, "/api/suggestions");
        setSuggestions(data);
    }

    useEffect(() => {
        getSuggestions();
    }, []);

    return (
        <div className="mt-4">
            <p className="text-base text-gray-400 font-bold mb-4">
                Suggestions for you
            </p>

            <div>
                {suggestions.map((suggestion) => (
                    <Suggestion key = {suggestion.id} suggestion = {suggestion} />
                ))}
            </div>
        </div>
    );
}
