import React from "react";

const Country = props => {

    const countryDisplay = () => {
        if (props.gameOver && !props.guessed) {
            return (
                <div className="country-display game-over" style={{ textAlign: "center", color: "red" }}>
                    {props.country}
                </div>
            )
        } else if (!props.gameOver && !props.guessed) {
            return (
                <div className="country-display" style={{ textAlign: "center" }}>
                    ???????????????
                </div>
            )
        } else {
            return (
                <div className="country-display" style={{ textAlign: "center" }}>
                    {props.country}
                </div>
            )
        }
    }


    return (
        countryDisplay()
    )
}

export default Country;