import React, { Component } from "react";
import logo from "../../img/quizmap-logo.svg";
import "./index.css";

class ScreenOverlay extends Component {

    render() {
        return (
            <div className={this.props.timerRunning ? (`loadScreenStyle`) : (`loadScreenStyle active`)}>
                <div className="loadCopyContainer">
                    <img
                        src={logo}
                        style={{
                            maxHeight: "300px"
                        }}
                        alt="quizmap Logo"
                        className="mb-3"
                    />
                    <h1 className="display-3 text-center mb-2 font-concert">Welcome to quizzmap!</h1>
                    <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="display-4 mb-5 text-center">
                        Show where you know
                    </h1>
                    <button
                        style={{ backgroundColor: "#599DE2", borderColor: "#599DE2" }}
                        className="mx-auto d-block w-50 btn btn-lg btn-primary"
                        onClick={this.props.toggleTimer}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        )
    }
}

export default ScreenOverlay;