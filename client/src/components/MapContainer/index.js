import React, { Component } from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    mapStyles = [
        {
            "elementType": "labels",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.fill",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{ "visibility": "on" }]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry",
            "stylers": [{ "visibility": "on" }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [{ "visibility": "off" }]
        },
        {
            "featureType": "transit",
            "stylers": [{ "visibility": "off" }]
        }
    ];

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
                styles={this.mapStyles}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAGDRTx2tf21QOjlnubjXjGqJ1JlfFTkqU'
})(MapContainer);