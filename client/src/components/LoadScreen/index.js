import React, { Component } from "react";
import logo from "../../img/quizmap-logo.svg";
import "./index.css";


class ScreenOverlay extends Component {

    state = {
        active: true
    }

    //on startGame click:
    // empty countriesGuessed array 
    // modal/overlay needs to disappear
    // remove disabled from input
    // timer needs to start

    //on pauseGame click:
    // timer needs to pause
    // apply disabled to input
    // add blur overlay (aka if )

    // on quitGame click:
    // timer needs to reset
    // disable input
    // add End of Game over

    startGame = () => {
        this.setState({ active: false });
        this.props.gameStarted();
    }

    render() {
        return (
            <div className={this.state.active ? (`loadScreenSyle active`) : (`loadScreenSyle`)}>
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
                        onClick={this.startGame}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        )
    }
}

export default ScreenOverlay;