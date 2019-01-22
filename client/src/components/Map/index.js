/* global google */
import React, { Component } from "react";
import { GoogleMap } from "react-google-maps-api";
import MapAppearance from "../../utils/MapAppearance";
import API from "../../utils/API.js";
import { setFillColor } from "../../utils/setFillColor.js";

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
        center: {
            lat: 39.9526,
            lng: -75.1652
        },
        quizmap: null,
        lastValidCenter: null,
    }

    setStyles = (map) => {
        map.data.setStyle({
            fillColor: '#FF0000'
        })
    }

    setChangeCenter = () => {
        this.state.quizmap.addListener('tilesloaded', (e) => {
            console.log('setting new center')
            let newCenter = this.state.quizmap.getCenter()
            this.setState({ center: newCenter })
            console.log('new center set')
        })
    }

    setMouseListener = () => {
        this.state.quizmap.data.addListener('mouseover', (e) => {
            console.log(e);
            this.props.setHoverInfo(e.feature.l.admin)
        })
        this.state.quizmap.data.addListener('mouseout', (e) => {
            this.props.setHoverInfo("???????????????")
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
            this.state.quizmap.data.overrideStyle(e.feature, setFillColor(this.props.secondsRemaining))
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
                this.state.quizmap.panToBounds(bounds, 150);
                // this.state.quizmap.setCenter(newCenter)

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

    loadUnaswered = (unansweredArr) => {
        unansweredArr.forEach((unAnsweredCountry) => {
            API.loadCountry(this.state.quizmap, unAnsweredCountry);
        })
    }

    clearMap = (map) => {
        map.data.forEach(item => map.data.remove(item))
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.gameStarted && this.props.gameStarted) {
            this.setStyles(this.state.quizmap);
            this.setOutOfBoundsListener();
            this.setFeatureListener();
            this.setMouseListener();
        }

        if (prevProps.correctGuess !== this.props.correctGuess) {
            API.loadCountry(this.state.quizmap, this.props.correctGuess);
        }

        if (prevProps.gameOver && !this.props.gameOver) {
            this.clearMap(this.state.quizmap)
            this.setFeatureListener();
        }

        if (prevProps.unansweredArr === null && this.props.unansweredArr) {
            google.maps.event.clearListeners(this.state.quizmap.data, "addfeature");
            this.loadUnaswered(this.props.unansweredArr);
        }

    }

    render() {
        return (

            <GoogleMap
                id="quizMap-gameDisplay"
                zoom={4}
                center={this.state.center}
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