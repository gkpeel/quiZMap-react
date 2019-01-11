import React, { Component } from "react";
import { LoadScript } from 'react-google-maps-api';
import SideBar from "./components/SideBar";
import ScreenOverlay from "./components/LoadScreen";
import Map from "./components/Map";
import "./App.css";

class App extends Component {

  state = {
    gameStarted: false,
    timerRunning: false
  }

  gameStart = () => {
    this.setState({
      gameStarted: true
    })
  }

  startGame = () => {
    this.setState({ gameStarted: true })
  }

  render() {
    return (
      <div className="App">
        <SideBar gameStarted={this.state.gameStarted} />
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
          language={"en"}
          region={"EN"}
          version={"weekly"}
          onLoad={() => console.log("script loaded")}
          loadingElement={<div>Loading...</div>}
        >
          {/* {this.state.gameStarted ? <Map /> : <ScreenOverlay gameStarted={this.startGame} timerRunning={this.state.timerRunning} />} */}
          <div
            style={{
              position: "relative",
              height: "100vh",
              width: "100%"
            }}
          >
            <ScreenOverlay gameStarted={this.startGame} timerRunning={this.state.timerRunning} />
            <Map />
          </div>

        </LoadScript>
        {/* <button onClick={this.gameStart}>Start Game</button> */}
      </div >
    );
  }
}

export default App;
