import React, { Component } from "react";
import "./App.css";
import MapContainer from "./components/MapContainer";
import GuessSideBar from "./components/GuessSideBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GuessSideBar />
        <MapContainer />
      </div>
    );
  }
}

export default App;
