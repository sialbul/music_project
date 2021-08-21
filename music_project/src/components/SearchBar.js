import React, { useState, useEffect } from "react";
import "../style/style.css";
import axios from "axios";

export default function SearchBar() {
    const [term, setTerm] = useState(" ");

    useEffect(() => {
        const searchAudio = async () => {
            await axios.get("https://itunes.apple.com/search", {
                params: {
                    term: term,
                    country: "US",
                    types: "artists"
                }
            });
        };
        searchAudio();
    }, [term]);

    return (
        <div className="searchContainer">
            <div className="field">
                <label>Album Search</label>
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </div>
        </div>
    );
}
