import React, { Component } from "react";
import "./index.css";

export class GuessSideBar extends Component {
    state = {

    }

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1>Guess a Country</h1>
                    <input className="guess-input" type="text" />
                    <div className="score-container">
                        <h6>Score:</h6>
                        <h6 className="score"></h6>
                    </div>
                    <div className="all-countries"></div>
                    <button className="btn btn-lg btn-secondary">Pause</button>
                </div>
            </div>
        );
    }
}

export default GuessSideBar;