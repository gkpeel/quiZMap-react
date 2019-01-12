import React, { Component } from "react";
import { LoadScript } from 'react-google-maps-api';
import SideBar from "./components/SideBar";
import ScreenOverlay from "./components/ScreenOverlay";
import Map from "./components/Map";
import "./App.css";

class App extends Component {

  state = {
    timerRunning: false,
    gameOver: false
  }

  toggleTimer = () => {
    if (this.state.gameStarted === false) {
      this.setState({ gameStarted: true })
    }
    if (this.state.timerRunning === false) {
      this.setState({ timerRunning: true })
    } else {
      this.setState({ timerRunning: false })
    }
  }

  correctGuess = (correctGuessInput) => {
    this.setState({ correctGuess: correctGuessInput });
  }

  render() {
    return (
      <div className="App">
        <SideBar
          timerRunning={this.state.timerRunning}
          toggleTimer={this.toggleTimer}
          correctGuess={this.correctGuess}
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
              timerRunning={this.state.timerRunning}
              toggleTimer={this.toggleTimer}
            />
            <Map
              correctGuess={this.state.correctGuess}
            />
          </div>

        </LoadScript>
        {/* <button onClick={this.gameStart}>Start Game</button> */}
      </div >
    );
  }
}

export default App;
