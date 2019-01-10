import React, { Component } from "react";
import SideBar from "./components/SideBar";
import { LoadScript } from 'react-google-maps-api';
import Map from "./components/Map";
import "./App.css";

class App extends Component {

  render() {
    return (
      <div className="App">
        <SideBar />
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
          language={"en"}
          region={"EN"}
          version={"weekly"}
          onLoad={() => console.log("script loaded")}
          loadingElement={<div>Loading...</div>}
        >
          <Map />
        </LoadScript>
      </div >
    );
  }
}

export default App;
