import React from "react";

const Country = props => {
    return (
        <div className="country-display" style={{ textAlign: "center" }}>
            {props.guessed ? props.country : "???????????????"}
        </div>
    )
}

export default Country;