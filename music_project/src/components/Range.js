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
            <div className="firstFive">
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
                First 5 albums
            </div>

            <div className="lastFive">
                {" "}
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
                Last 5 albums
            </div>

            <div className="timeRange">
                {" "}
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
                Before
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
                After
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
