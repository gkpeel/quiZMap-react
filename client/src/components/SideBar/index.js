import React, { Component } from "react";
import Timer from "../Timer";
import CountryGuess from "../CountryGuess";
import "./index.css";

class SideBar extends Component {

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1 className="mb-4 font-concert">Guess a Country</h1>

                    <CountryGuess />

                    {/* Timer TO-DOs: Trigger SoG/EoG */}
                    <Timer gameStarted={this.props.gameStarted} />

                </div>
            </div>
        );
    }
}

export default SideBar;