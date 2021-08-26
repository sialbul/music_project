import React, { useState, useEffect } from "react";
import "../style/style.css";
import axios from "axios";
import moment from "moment";
import Logo from "../itunes.png";
import Range from "./Range";

export default function SearchBar() {
    const [term, setTerm] = useState("Korn");
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);
    const [firstchecked, setFirstchecked] = useState(false);
    const [lastchecked, setLastchecked] = useState(false);
    const [beforechecked, setBeforechecked] = useState(false);
    const [afterchecked, setAfterchecked] = useState(false);
    const [year, setYear] = useState(2020);
    const [artisname, setArtistname] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsloaded] = useState(false);

    const size = firstchecked || lastchecked ? 5 : 200;

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(term);
        }, 1000);
        return () => {
            clearTimeout(timerId);
        };
    }, [term]);

    useEffect(() => {
        if (debouncedTerm.length > 0) {
            setIsloaded(false);
            const searchAudio = async () => {
                try {
                    const { data } = await axios.get(
                        "https://itunes.apple.com/search",
                        { mode: "cors" },
                        {
                            params: {
                                term: debouncedTerm,
                                country: "US",
                                types: "artists",
                                media: "music",
                                limit: 100,
                                entity: "album",
                                collectionType: "album"
                            }
                        }
                    );
                    setIsError(false);
                    if (firstchecked) {
                        setResults(
                            data.results.sort(
                                (a, b) =>
                                    new Date(a.releaseDate) -
                                    new Date(b.releaseDate)
                            )
                        );
                    } else if (beforechecked) {
                        setResults(
                            data.results
                                .sort(
                                    (a, b) =>
                                        new Date(b.releaseDate) -
                                        new Date(a.releaseDate)
                                )
                                .filter(
                                    (r) =>
                                        new Date(r.releaseDate)
                                            .toISOString()
                                            .slice(0, 4) < year
                                )
                        );
                    } else if (afterchecked) {
                        setResults(
                            data.results
                                .sort(
                                    (a, b) =>
                                        new Date(b.releaseDate) -
                                        new Date(a.releaseDate)
                                )
                                .filter(
                                    (r) =>
                                        new Date(r.releaseDate)
                                            .toISOString()
                                            .slice(0, 4) >= year
                                )
                        );
                    } else {
                        setResults(
                            data.results.sort(
                                (a, b) =>
                                    new Date(b.releaseDate) -
                                    new Date(a.releaseDate)
                            )
                        );
                    }
                    setIsloaded(true);
                } catch (error) {
                    console.error(error);
                    setResults(null);
                    setIsloaded(true);
                    setIsError(true);
                }
            };
            searchAudio();
        } else {
            setResults([]);
        }
    }, [
        debouncedTerm,
        firstchecked,
        lastchecked,
        beforechecked,
        afterchecked,
        year
    ]);

    useEffect(() => {
        const artistName = () => {
            return setArtistname(debouncedTerm);
        };
        artistName();
    }, [debouncedTerm]);
    const renderedResults = results?.slice(0, size).map((result) => {
        const date = moment(`${result.releaseDate}`).format("DD/MM/YYYY");
        return (
            <div className="renderedDiv" key={result.collectionId}>
                <div className="resultAlbum">
                    <div className="resultImage">
                        <img
                            className="albumImage"
                            alt="album"
                            src={result.artworkUrl100}
                        />
                    </div>
                    <div className="resultInfo">
                        <div>Artist Name: {result.artistName}</div>
                        <a
                            className="renderResult"
                            href={result.collectionViewUrl}
                            target="_black">
                            <div className="header">
                                Album Name: {result.collectionName}
                            </div>
                        </a>

                        <div>Release Date: {date}</div>
                    </div>
                </div>
                <hr />
            </div>
        );
    });

    const onFormSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="searchContainer">
            <div className="logoField">
                <div className="field">
                    {" "}
                    <img alt="albumImage" className="navLogo" src={Logo} />{" "}
                    <h1> ALBUM SEARCH</h1>
                    <div>
                        <form onSubmit={onFormSubmit}>
                            <span>Search </span>
                            <input
                                placeholder="Artist Name"
                                type="text"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            <input
                                className="searchReset"
                                type="reset"
                                value="X"
                                onClick={() => {
                                    setTerm("");
                                }}
                            />
                        </form>
                    </div>
                </div>

                <div className="rangeField">
                    <Range
                        setFirstchecked={setFirstchecked}
                        setLastchecked={setLastchecked}
                        setAfterchecked={setAfterchecked}
                        setBeforechecked={setBeforechecked}
                        setYear={setYear}
                    />
                </div>
            </div>

            <h2 className="header1">{artisname}</h2>
            {isError && <div>An error occurred fetching data!</div>}

            {isLoaded && renderedResults?.length > 0 && (
                <div>
                    <h3>Total {renderedResults.length} albums</h3>
                    <hr />
                    <div>{renderedResults}</div>{" "}
                </div>
            )}
            {isLoaded && renderedResults?.length === 0 && (
                <h3>No result found! Please search again!</h3>
            )}
        </div>
    );
}
