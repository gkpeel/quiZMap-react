import React from "react";

const Scoreboard = props => {
    return (
        <div className="score-container">
            <h6>Score:</h6>
            <h6 className="score">{props.countriesGuessed} / {props.countriesToGuess}</h6>
        </div>
    )
}

export default Scoreboard;