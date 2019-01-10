import React, { Component } from "react";
import { GoogleMap } from "react-google-maps-api";
import MapAppearance from "../../utils/MapAppearance";

const googleMapOptions = {
    styles: MapAppearance,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false,
}

class WorldMap extends Component {

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
                }}
                options={googleMapOptions}
            >
            </GoogleMap>
        )
    }

}

export default WorldMap;