import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';

// import styles array from utils
import MapAppearance from '../../utils/MapAppearance';

// Country data courtesy of https://github.com/datasets/geo-countries

const mapStyles = {
    width: '100%',
    height: '100vh'
};

export class MapContainer extends Component {

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={4}
                style={mapStyles}
                initialCenter={{
                    lat: 39.9526,
                    lng: -75.1652
                }}
                zoomControls={true}
                mapTypeControl={false}
                fullscreenControl={false}
                rotateControl={false}
                streetViewControl={false}
                gestureHandling={'cooperative'}
                styles={MapAppearance}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAGDRTx2tf21QOjlnubjXjGqJ1JlfFTkqU'
})(MapContainer);