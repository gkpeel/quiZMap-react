import React, { Component } from "react";
import { LoadScript } from 'react-google-maps-api';
import SideBar from "./components/SideBar";
import ScreenOverlay from "./components/ScreenOverlay";
import Map from "./components/Map";
import "./App.css";

class App extends Component {

  state = {
    gameStarted: false,
    gameOver: false,
    timerRunning: false,
  }

  startGame = () => {
    this.setState({ gameStarted: true })
    this.setState({ timerRunning: true })
    this.setState({ gameOver: false })
  }

  endGame = () => {
    this.setState({ gameOver: true })
    this.setState({ gameStarted: false })
    this.setState({ timerRunning: false })
  }

  toggleTimer = () => {
    let timerValue = this.state.timerRunning;
    this.setState({ timerRunning: !timerValue })
  }

  correctGuess = (correctGuessInput) => {
    this.setState({ correctGuess: correctGuessInput });
  }

  setMaxScore = (countriesToGuess) => {
    this.setState({ maxScore: countriesToGuess })
  }

  setScore = (countriesGuessed) => {
    this.setState({ score: countriesGuessed })
  }


  render() {
    return (
      <div className="App">
        <SideBar
          gameStarted={this.state.gameStarted}
          gameOver={this.state.gameOver}
          timerRunning={this.state.timerRunning}
          startGame={this.startGame}
          endGame={this.endGame}
          toggleTimer={this.toggleTimer}
          correctGuess={this.correctGuess}
          setMaxScore={this.setMaxScore}
          setScore={this.setScore}
        />

        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
          language={"en"}
          region={"EN"}
          version={"weekly"}
          // onLoad={() => console.log("script loaded")}
          loadingElement={<div>Loading...</div>}
        >
          <div
            style={{
              position: "relative",
              height: "100vh",
              width: "100%"
            }}
          >
            <ScreenOverlay
              gameStarted={this.state.gameStarted}
              gameOver={this.state.gameOver}
              timerRunning={this.state.timerRunning}
              startGame={this.startGame}
              toggleTimer={this.toggleTimer}
              score={this.state.score}
              maxScore={this.state.maxScore}
            />
            <Map
              correctGuess={this.state.correctGuess}
            />
          </div>
        </LoadScript>
      </div >
    );
  }
}

export default App;
