import React from "react"
import './index.css'

const Nicebox = (props) => {
    return (
        <div className="nicebox">
            {props.hoverInfo}
        </div>
    )
}

export default Nicebox