import React from "react";

const Scoreboard = props => {
    return (
        <div className="score-container" style={{ color: "#fff" }}>
            <h4 className="score-header font-concert float-left">Score:</h4>
            <h4 className="score float-right">{props.countriesGuessed} / {props.countriesToGuess}</h4>
        </div>
    )
}

export default Scoreboard;