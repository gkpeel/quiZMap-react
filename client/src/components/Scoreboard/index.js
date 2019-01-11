import React from "react";

const Scoreboard = props => {
    return (
        <div className="score-container">
            <h4 className="font-concert">Score:</h4>
            <h4 className="score">{props.countriesGuessed} / {props.countriesToGuess}</h4>
        </div>
    )
}

export default Scoreboard;