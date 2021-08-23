import React from "react";

export default function Range({
    setFirstchecked,
    setLastchecked,
    setAfterchecked,
    setBeforechecked,
    setYear
}) {
    return (
        <form className="optionField">
            <div className="wrapper">
                <label>
                    <input
                        type="radio"
                        name="checkRadio"
                        className="firstCheck"
                        onClick={() => {
                            setFirstchecked(true);
                            setLastchecked(false);
                            setAfterchecked(false);
                            setBeforechecked(false);
                        }}
                    />{" "}
                    <span className="radio-pulse" />
                    <span className="radio-button">
                        <span className="radio-button-inner" />
                    </span>
                    <span className="radio-label">First 5 albums</span>
                </label>
            </div>

            <div className="wrapper">
                {" "}
                <label>
                    <input
                        type="radio"
                        name="checkRadio"
                        className="lastCheck"
                        onClick={() => {
                            setFirstchecked(false);
                            setLastchecked(true);
                            setAfterchecked(false);
                            setBeforechecked(false);
                        }}
                    />{" "}
                    <span className="radio-pulse" />
                    <span className="radio-button">
                        <span className="radio-button-inner" />
                    </span>
                    <span className="radio-label">Last 5 albums</span>
                </label>
            </div>

            <div className="timeRange">
                {" "}
                <div className="wrapper">
                    <label>
                        <input
                            type="radio"
                            name="checkRadio"
                            className="beforeButton"
                            onClick={() => {
                                setFirstchecked(false);
                                setLastchecked(false);
                                setAfterchecked(false);
                                setBeforechecked(true);
                            }}
                        />{" "}
                        <span className="radio-pulse" />
                        <span className="radio-button">
                            <span className="radio-button-inner" />
                        </span>
                        <span className="radio-label">Before</span>
                    </label>
                </div>
                <select onChange={(e) => setYear(e.target.value)}>
                    {" "}
                    <option value="2020">2020</option>
                    <option value="2010">2010</option>
                    <option value="2000">2000</option>
                    <option value="1990">1990</option>
                    <option value="1980">1980</option>
                    <option value="1970">1970</option>
                    <option value="1960">1960</option>
                    <option value="1950">1950</option>
                </select>
                <div className="wrapper timeRadio">
                    <label>
                        <input
                            type="radio"
                            name="checkRadio"
                            className="afterButton"
                            onClick={() => {
                                setFirstchecked(false);
                                setLastchecked(false);
                                setAfterchecked(true);
                                setBeforechecked(false);
                            }}
                        />{" "}
                        <span className="radio-pulse" />
                        <span className="radio-button">
                            <span className="radio-button-inner" />
                        </span>
                        <span className="radio-label">After</span>
                    </label>
                </div>
            </div>
            <input
                type="reset"
                value="Reset"
                onClick={() => {
                    setFirstchecked(false);
                    setLastchecked(false);
                    setAfterchecked(false);
                    setBeforechecked(false);
                    setYear(2020);
                }}
            />
        </form>
    );
}
