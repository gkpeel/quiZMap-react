import React from "react"
import './index.css'

// Receive the props from <Map/>'s mouseover listeners (by way of <Game/>) and display
const Nicebox = (props) => {
    return (
        <div className="nicebox">
            {props.hoverInfo}
        </div>
    )
}

export default Nicebox