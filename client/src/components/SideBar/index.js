import React, { Component } from "react"
import Menu from "../Menu"
import Timer from "../Timer";
import CountryGuess from "../CountryGuess"
import "./index.css";

class SideBar extends Component {

    // Customize title based on prop.quizType value
    renderTitle = () => {
        switch (this.props.quizType) {
            case ("europe"):
                return 'in Europe'
            case ("africa"):
                return 'in Africa'
            case ("asia"):
                return 'in Asia'
            case ("oceania"):
                return 'in Oceania'
            case ("north-america"):
                return 'in North America'
            case ("south-america"):
                return 'in South America'
            default:
                return 'of the World'
        }
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
                <Menu
                    quizType={this.props.quizType}
                />
            </div >
        );
    }
}

export default SideBar;