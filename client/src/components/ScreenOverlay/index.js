import React, { Component } from "react";
import logo from "../../img/quizmap-logo.svg";
import "./index.css";

class ScreenOverlay extends Component {

    render() {
        if (this.props.gameOver) {
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
                        <h1 className="display-3 text-center mb-2 font-concert">
                            {this.props.score === this.props.maxScore ? 'You won!' : 'Game Over!'}
                        </h1>
                        <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="display-4 mb-5 text-center">
                            {this.props.score === this.props.maxScore ? `You answered all ${this.props.maxScore} countries! Great job!` : `You scored ${this.props.score} out of ${this.props.maxScore}!`}
                        </h1>
                        <button
                            style={{ backgroundColor: "#599DE2", borderColor: "#599DE2" }}
                            className="mx-auto d-block w-50 btn btn-lg btn-primary"
                            onClick={this.props.startGame}
                        >
                            Play again?
                    </button>
                    </div>
                </div>
            )
        }
        else if (!this.props.gameStarted && !this.props.timerRunning) {
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
                            onClick={this.props.startGame}
                        >
                            Start Game
                    </button>
                    </div>
                </div>
            )
        }
        else if (this.props.gameStarted && !this.props.timerRunning) {
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
                        <h1 style={{ fontWeight: 100, fontStyle: "italic" }} className="display-4 mb-5 text-center">
                            Game is Paused
                    </h1>
                        <button
                            style={{ backgroundColor: "#599DE2", borderColor: "#599DE2" }}
                            className="mx-auto d-block w-50 btn btn-lg btn-primary"
                            onClick={this.props.toggleTimer}
                        >
                            Resume Game
                    </button>
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