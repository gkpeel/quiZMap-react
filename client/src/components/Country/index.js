import React from "react";
import './index.css'

const Country = props => {

    // Return html depending on the country's props of the game being over and/or the country being guessed
    const countryDisplay = () => {
        if (props.gameOver && !props.guessed) {
            return (
                <div className="country-container">
                    <div className="country-display game-over">
                        {props.country}
                    </div>
                </div>
            )
        } else if (!props.gameOver && !props.guessed) {
            return (
                <div className="country-container">
                    <div className="country-display">
                        ???????????????
                    </div>
                </div>
            )
        } else {
            return (
                <div className="country-container">
                    <div className="country-display">
                        {props.country}
                    </div>
                </div>
            )
        }
    }


    return (
        countryDisplay()
    )
}

export default Country;