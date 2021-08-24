import React, { Component } from "react";
import SearchBar from "./SearchBar";

export default class App extends Component {
    onTermSubmit = (term) => {
        console.log(term);
    };

    render() {
        return (
            <div className="container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
            </div>
        );
    }
}
