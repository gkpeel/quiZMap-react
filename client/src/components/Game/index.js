import React, { Component } from "react"
import { LoadScript } from 'react-google-maps-api'
import SideBar from "../SideBar"
import ScreenOverlay from "../ScreenOverlay"
import Nicebox from "../Nicebox"
import Map from "../Map"
import './index.css'

class Game extends Component {

  state = {
    gameStarted: false,
    gameOver: false,
    timerRunning: false,
    score: 0,
    unAnsweredArr: null,
    hoverInfo: "???????????????"
  }

  // function to reset states to start game
  startGame = () => {
    this.setState({
      gameStarted: true,
      timerRunning: true,
      gameOver: false,
      score: 0,
      unAnsweredArr: null
    })
  }

  // function to end game: stops timer, loads countries in unAnsweredArr, makes overlay active
  endGame = () => {
    this.setState({ gameOver: true })
    this.setState({ gameStarted: false })
    this.setState({ timerRunning: false })
  }

  // function used to toggle the timerRunning state to pause/resume <Timer/> component
  toggleTimer = () => {
    let timerValue = this.state.timerRunning;
    this.setState({ timerRunning: !timerValue })
  }

  // function to receive a correct answer from <CountryGuess/> and pass it to <Map/>
  correctGuess = (correctGuessInput) => {
    this.setState({ correctGuess: correctGuessInput });
  }

  // Set Max Score based on <CountryGuess/>'s [CountriesToGuess] state
  setMaxScore = (countriesToGuess) => {
    this.setState({ maxScore: countriesToGuess })
  }

  // Set Max Score based on <CountryGuess>'s [CountriesToGuess] state
  setScore = (countriesGuessed) => {
    this.setState({ score: countriesGuessed })
  }


  getUnanswered = (unAnsweredArr) => {
    this.setState({ unAnsweredArr: unAnsweredArr })
  }

  // Receives the hoverInfo from <Map/> and passes in to <Nicebox/>
  setHoverInfo = (hoverInfo) => {
    this.setState({ hoverInfo: hoverInfo })
  }

  // Receives secondsRemaining state from <Timer/> and passes it down to the <Map/> (for dynamic color creation)
  setSecondsRemaining = (secondsRemaining) => {
    this.setState({ secondsRemaining: secondsRemaining });
  }


  render() {
    return (
      <div className="App">
        <SideBar
          quizType={this.props.match.params.quizType}
          gameStarted={this.state.gameStarted}
          gameOver={this.state.gameOver}
          timerRunning={this.state.timerRunning}
          startGame={this.startGame}
          endGame={this.endGame}
          toggleTimer={this.toggleTimer}
          correctGuess={this.correctGuess}
          setMaxScore={this.setMaxScore}
          setScore={this.setScore}
          getUnanswered={this.getUnanswered}
          setSecondsRemaining={this.setSecondsRemaining}
        />

        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
          language={"en"}
          region={"EN"}
          version={"weekly"}
          loadingElement={
            <div className="d-flex justify-content-center font-concert">
              <h1 className="mt-5 ml-5 text-muted">Loading...</h1>
            </div>
          }
        >
          <div className="game-display__container">
            <ScreenOverlay
              gameStarted={this.state.gameStarted}
              gameOver={this.state.gameOver}
              timerRunning={this.state.timerRunning}
              startGame={this.startGame}
              toggleTimer={this.toggleTimer}
              score={this.state.score}
              maxScore={this.state.maxScore}
            />
            <Nicebox
              gameStarted={this.state.gameStarted}
              hoverInfo={this.state.hoverInfo}
            />
            <Map
              quizType={this.props.match.params.quizType}
              gameStarted={this.state.gameStarted}
              gameOver={this.state.gameOver}
              correctGuess={this.state.correctGuess}
              unansweredArr={this.state.unAnsweredArr}
              setHoverInfo={this.setHoverInfo}
              secondsRemaining={this.state.secondsRemaining}
            />
          </div>
        </LoadScript>
      </div >
    )
  }
}

export default Game
