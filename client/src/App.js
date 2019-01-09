import React, { Component } from "react";
import GuessSideBar from "./components/GuessSideBar";
import { LoadScript, GoogleMap } from 'react-google-maps-api';
import MapAppearance from "./utils/MapAppearance";
import "./App.css";

const googleMapOptions = {
  styles: MapAppearance,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  zoomControl: false,
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <GuessSideBar />
        <LoadScript
          id="script-loader"
          googleMapsApiKey={process.env.REACT_APP_MAP_KEY}
          language={"en"}
          region={"EN"}
          version={"weekly"}
          onLoad={() => console.log("script loaded")}
          loadingElement={<div>Loading...</div>}>

          <GoogleMap
            id="basic-map-example"
            mapContainerStyle={{
              height: "100vh",
              width: "100%"
            }}
            zoom={4}
            maxZoom={6}
            center={{
              lat: 39.9526,
              lng: -75.1652
            }}
            onLoad={(map) => {
              console.log('map.data: ', map.data);
              console.log(process.env.REACT_APP_MAP_KEY);
              map.data.loadGeoJson('/places.geojson');
            }}
            options={googleMapOptions}
          >
          </GoogleMap>
        </LoadScript>
      </div >
    );
  }
}

export default App;
