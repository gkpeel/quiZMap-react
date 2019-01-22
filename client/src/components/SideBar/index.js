import React, { Component } from "react"
import Menu from "../Menu"
import Timer from "../Timer";
import CountryGuess from "../CountryGuess"
import "./index.css";

class SideBar extends Component {

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1 className="mb-4 font-concert" style={{ color: "#fff" }}>Guess a Country</h1>
                    <CountryGuess
                        quizType={this.props.quizType}
                        gameStarted={this.props.gameStarted}
                        gameOver={this.props.gameOver}
                        timerRunning={this.props.timerRunning}
                        correctGuess={this.props.correctGuess}
                        setMaxScore={this.props.setMaxScore}
                        setScore={this.props.setScore}
                        endGame={this.props.endGame}
                        getUnanswered={this.props.getUnanswered}
                    />
                    <Timer
                        quizType={this.props.quizType}
                        gameStarted={this.props.gameStarted}
                        gameOver={this.props.gameOver}
                        timerRunning={this.props.timerRunning}
                        startGame={this.props.startGame}
                        endGame={this.props.endGame}
                        toggleTimer={this.props.toggleTimer}
                        setSecondsRemaining={this.props.setSecondsRemaining}
                    />
                </div>
                <Menu />
            </div >
        );
    }
}

export default SideBar;