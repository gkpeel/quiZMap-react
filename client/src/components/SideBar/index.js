import React, { Component } from "react";
import Timer from "../Timer";
import CountryGuess from "../CountryGuess";
import "./index.css";

class SideBar extends Component {

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1 className="mb-4 font-concert">Guess a Country</h1>
                    <CountryGuess
                        gameStarted={this.props.gameStarted}
                        gameOver={this.props.gameOver}
                        timerRunning={this.props.timerRunning}
                        correctGuess={this.props.correctGuess}
                        setMaxScore={this.props.setMaxScore}
                        setScore={this.props.setScore}
                        endGame={this.props.endGame}
                    />
                    <Timer
                        gameStarted={this.props.gameStarted}
                        gameOver={this.props.gameOver}
                        timerRunning={this.props.timerRunning}
                        startGame={this.props.startGame}
                        endGame={this.props.endGame}
                        toggleTimer={this.props.toggleTimer}
                    />
                </div>
            </div>
        );
    }
}

export default SideBar;