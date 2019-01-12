import React, { Component } from "react";
import { GoogleMap } from "react-google-maps-api";
import MapAppearance from "../../utils/MapAppearance";
import API from "../../utils/API.js";

const googleMapOptions = {
    styles: MapAppearance,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
}

class Map extends Component {

    componentDidUpdate() {
        API.loadCountry(this.props.correctGuess, this.state.quizmap);
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
                maxZoom={6}
                center={{
                    lat: 39.9526,
                    lng: -75.1652
                }}
                onLoad={(map) => {

                    console.log('map.data: ', map.data);
                    map.data.loadGeoJson('/places.geojson');
                    // this.setState({ quizmap: map });
                }}
                options={googleMapOptions}
            >
            </GoogleMap>
        )
    }

}

export default Map;