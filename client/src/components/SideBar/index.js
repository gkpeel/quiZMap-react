import React, { Component } from "react"
import Menu from "../Menu"
import Timer from "../Timer";
import CountryGuess from "../CountryGuess"
import "./index.css";

class SideBar extends Component {

    renderTitle = () => {
        if (this.props.quizType === "europe") {
            return 'in Europe'
        }
        if (this.props.quizType === "africa") {
            return 'in Africa'
        }
        if (this.props.quizType === "asia") {
            return 'in Asia'
        }
        if (this.props.quizType === "oceania") {
            return 'in Oceania'
        }
        if (this.props.quizType === "north-america") {
            return 'in North America'
        }
        if (this.props.quizType === "south-america") {
            return 'in South America'
        }
        return 'of the World'
    }

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1>Name the Countries {this.renderTitle()}</h1>
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