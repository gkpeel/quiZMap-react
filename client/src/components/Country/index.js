import React from "react";

const Country = props => {
    return (
        <div className="country-display">
            {props.guessed ? props.country : "????????????"}
        </div>
    )
}

export default Country;