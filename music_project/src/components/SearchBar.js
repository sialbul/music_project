import React, { useState, useEffect } from "react";
import "../style/style.css";
import axios from "axios";
import moment from "moment";
import Logo from "../itunes.png";

export default function SearchBar() {
    const [term, setTerm] = useState("korn");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);
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
                        limit: 10,
                        entity: "album",
                        explicit: "yes"
                    }
                }
            );
            setResults(data.results);
        };
        searchAudio();
    }, [debouncedTerm]);

    const renderedResults = results
        .sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
        .map((result) => {
            const date = moment(`${result.releaseDate}`).format("DD/MM/YYYY");
            return (
                <div className="renderedDiv" key={result.collectionId}>
                    <a
                        className="renderResult"
                        href={result.collectionViewUrl}
                        target="_black">
                        <img alt="album" src={result.artworkUrl100} />
                        <div className="header">{result.collectionName}</div>
                    </a>
                    <div>{date}</div>

                    <hr />
                </div>
            );
        });

    return (
        <div className="searchContainer">
            <div className="field">
                <img className="navLogo" src={Logo} />
                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                />
            </div>
            <h2 className="header">{term}</h2>
            <hr />
            <div>{renderedResults}</div>
        </div>
    );
}
