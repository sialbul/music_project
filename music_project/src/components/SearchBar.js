import React, { useState, useEffect } from "react";
import "../style/style.css";
import axios from "axios";
import moment from "moment";

export default function SearchBar() {
    const [term, setTerm] = useState("korn");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const searchAudio = async () => {
            const { data } = await axios.get(
                "https://itunes.apple.com/search",
                {
                    params: {
                        term: term,
                        country: "US",
                        types: "artists",
                        media: "music",
                        limit: 5
                    }
                }
            );

            setResults(data.results);
        };
        searchAudio();
    }, [term]);

    const renderedResults = results.map((result) => {
        const date = moment(`${result.releaseDate}`).format("DD/MM/YYYY");
        return (
            <div className="renderedDiv">
                <a
                    className="renderResult"
                    href={result.collectionViewUrl}
                    target="_black">
                    <div className="header">{result.trackName}</div>
                    <div>{date}</div>
                    <img src={result.artworkUrl100} />
                </a>
            </div>
        );
    });

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
            <div>{renderedResults}</div>
        </div>
    );
}
