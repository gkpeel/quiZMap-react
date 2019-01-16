/* global google */
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
        quizmap: null,
        lastValidCenter: null,
    }

    setStyles = (map) => {
        map.data.setStyle({
            fillColor: '#FF0000'
        })
    }

    setOutOfBoundsListener = () => {
        this.state.quizmap.addListener('dragend', () => {
            this.checkLatitude(this.state.quizmap);
        });
        this.state.quizmap.addListener(this.state.quizmap, 'idle', () => {
            this.checkLatitude(this.state.quizmap);
        });
        this.state.quizmap.addListener(this.state.quizmap, 'zoom_changed', () => {
            this.checkLatitude(this.state.quizmap);
        });
    };

    setFeatureListener = () => {
        this.state.quizmap.data.addListener('addfeature', (e) => {
            if (e.feature.getGeometry().getType() === 'Polygon' || e.feature.getGeometry().getType() === 'MultiPolygon') {
                var bounds = new google.maps.LatLngBounds();
                e.feature.getGeometry().getArray().forEach(function (path) {

                    if (e.feature.getGeometry().getType() === 'Polygon') {
                        // iterate over the points in the path
                        path.getArray().forEach(function (latLng) {
                            //extend the bounds
                            bounds.extend(latLng);
                        })
                    } else if (e.feature.getGeometry().getType() === 'MultiPolygon') {
                        // console.log('MultiPolygon added');
                        path.getArray().forEach(function (nestedPath) {
                            nestedPath.getArray().forEach(function (latLng) {
                                //extend the bounds
                                bounds.extend(latLng);
                            })
                        })
                    }

                });
                this.state.quizmap.panToBounds(bounds);
                // this.state.quizmap.setCenter(this.state.quizmap.getCenter())
            }
        })
    }


    checkLatitude = (map) => {
        // let bounds = map.getBounds();
        let sLat = map.getBounds().getSouthWest().lat();
        let nLat = map.getBounds().getNorthEast().lat();
        if (sLat < -85 || nLat > 85) {
            if (this.lastValidCenter) {
                map.setCenter(this.lastValidCenter);
            }
        }
        else {
            this.lastValidCenter = map.getCenter();
        }
    }

    clearMap = (map) => {
        map.data.forEach(item => map.data.remove(item))
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.gameStarted && this.props.gameStarted) {
            this.setStyles(this.state.quizmap);
            this.setOutOfBoundsListener();
            this.setFeatureListener();
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
                id="quizMap-gameDisplay"
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
                    this.setState({ quizmap: map });
                }}
                options={googleMapOptions}
            >
            </GoogleMap>
        )
    }

}

export default Map;