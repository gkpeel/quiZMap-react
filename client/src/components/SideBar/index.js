import React, { Component } from "react";
import Timer from "../Timer";
import CountryGuess from "../CountryGuess";
import "./index.css";

class SideBar extends Component {

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1>Guess a Country</h1>

                    <CountryGuess />

                    {/* Timer TO-DOs: Trigger SoG/EoG */}
                    <Timer />

                </div>
            </div>
        );
    }
}

export default SideBar;