import React, { Component } from "react";
// import logo from "../../img/quizmap-logo.svg";
import logo2 from "../../img/logo-redesign.svg"
import "./index.css";

class ScreenOverlay extends Component {
    state = {
        overlayActive: true
    }

    // toggle overlayActive props based on <Game/> state, 
    // overlayActive state determines .active class to change display: none to display: block
    toggleOverlay = () => {
        if ((!this.props.timerRunning || this.props.gameOver)) {
            this.setState({ overlayActive: true })
        } else {
            this.setState({ overlayActive: false })
        }
    }

    // Review button's onClick event to clear .active class
    clearOverlay = () => {
        this.setState({ overlayActive: false })
    }

    // call toggleOverlay if game is paused 
    componentDidUpdate = (prevProps) => {
        if (prevProps.timerRunning && !this.props.timerRunning) {
            this.toggleOverlay();
        }
    }

    // Depending on the gameStarted, timerRunning, and gameOver props:
    // Render different overlay, Start Game/Welcome overlay, Game Paused overlay, Game Over overlay
    // Button click events either, change <Game/>'s gameStarted state to true or toggle Overlay state/.active class
    render() {
        if (this.props.gameOver) {
            return (
                <div className={this.state.overlayActive ? 'loadScreenStyle active' : 'loadScreenStyle'}>
                    <div className="loadCopyContainer">
                        <img
                            src={logo2}
                            alt="quizmap Logo"
                            className="mb-3 quizmap-logo"
                        />
                        <h1 className="maintitle text-center mb-2 font-concert">
                            {this.props.score === this.props.maxScore ? 'You won!' : 'Game Over!'}
                        </h1>
                        <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="subtitle text-center">
                            {this.props.score === this.props.maxScore ? `You answered all ${this.props.maxScore} countries! Great job!` : `You scored ${this.props.score} out of ${this.props.maxScore}!`}
                        </h1>
                        <div className="buttons-container" style={{ display: "flex" }}>
                            <button
                                style={{ backgroundColor: "#376191", borderColor: "#376191" }}
                                className="mr-2 d-block w-50 btn btn-lg btn-primary"
                                onClick={this.props.startGame}
                            >
                                Play again?
                            </button>
                            <button
                                style={{ backgroundColor: "#83db24", borderColor: "#83db24" }}
                                className="ml-2 d-block w-50 btn btn-lg btn-primary"
                                onClick={() => this.clearOverlay()}
                            >
                                Review
                            </button>
                        </div>
                        <a className="attribution-link" target="blank" href="https://www.freepik.com/free-photos-vectors/icon">Icon vector created by freepik - www.freepik.com</a>
                    </div>
                </div>
            )
        }
        else if (!this.props.gameStarted && !this.props.timerRunning) {
            return (
                <div className={this.state.overlayActive ? 'loadScreenStyle active' : 'loadScreenStyle'}>
                    <div className="loadCopyContainer">
                        <img
                            src={logo2}
                            alt="quizmap Logo"
                            className="mb-3 quizmap-logo"
                        />
                        <h1 className="maintitle text-center mb-2 font-concert">Welcome to quiZMap!</h1>
                        <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="subtitle text-center">
                            Show where you know
                    </h1>
                        <button
                            style={{ backgroundColor: "#376191", borderColor: "#376191" }}
                            className="mx-auto d-block w-50 btn btn-lg btn-primary"
                            onClick={this.props.startGame}
                        >
                            Start Game
                        </button>
                        <a className="attribution-link" target="blank" href="https://www.freepik.com/free-photos-vectors/icon">Icon vector created by freepik - www.freepik.com</a>
                    </div>
                </div>
            )
        }
        else if (this.props.gameStarted && !this.props.timerRunning) {
            return (
                <div className={this.state.overlayActive ? 'loadScreenStyle active' : 'loadScreenStyle'}>
                    <div className="loadCopyContainer">
                        <img
                            src={logo2}
                            alt="quizmap Logo"
                            className="mb-3 quizmap-logo"
                        />
                        <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="maintitle mb-lg-5 text-center">
                            Game is Paused
                    </h1>
                        <button
                            style={{ backgroundColor: "#376191", borderColor: "#376191" }}
                            className="mx-auto d-block w-50 btn btn-lg btn-primary"
                            onClick={this.props.toggleTimer}
                        >
                            Resume Game
                        </button>
                        <a className="attribution-link" target="blank" href="https://www.freepik.com/free-photos-vectors/icon">Icon vector created by freepik - www.freepik.com</a>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="loadScreenStyle">
                    <div className="loadCopyContainer">
                        This should never show..
                    </div>
                </div>
            )
        }
    }
}

export default ScreenOverlay;