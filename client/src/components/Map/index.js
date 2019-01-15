import React, { Component } from "react";
import { GoogleMap } from "react-google-maps-api";
import MapAppearance from "../../utils/MapAppearance";
import API from "../../utils/API.js";

const googleMapOptions = {
    styles: MapAppearance,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    maxZoom: 6,
    minZoom: 3
}

class Map extends Component {

    state = {
        quizmap: null
    }

    componentDidMount() {
    }

    setStyles = (map) => {
        console.log(map.data);
        map.data.setStyle({
            fillColor: '#FF0000'
        })
    }

    clearMap = (map) => {
        map.data.forEach(item => map.data.remove(item))
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.gameStarted && this.props.gameStarted) {
            this.setStyles(this.state.quizmap);
        }

        if (prevProps.correctGuess !== this.props.correctGuess) {
            API.loadCountry(this.props.correctGuess, this.state.quizmap);
        }

        if (prevProps.gameOver && !this.props.gameOver) {
            this.clearMap(this.state.quizmap)
        }
    }

    render() {
        return (

            <GoogleMap
                id="basic-map-example"
                mapContainerStyle={{
                    height: "100vh",
                    width: "100%"
                }}
                zoom={4}
                center={{
                    lat: 39.9526,
                    lng: -75.1652
                }}
                onLoad={(map) => {
                    // console.log('map.data: ', map.data);
                    // map.data.loadGeoJson('/places.geojson');
                    this.setState({ quizmap: map });
                    // this.state.quizmap.setStyle({ fillColor: '#FF0000' })
                }}
                options={googleMapOptions}
            >
            </GoogleMap>
        )
    }

}

export default Map;