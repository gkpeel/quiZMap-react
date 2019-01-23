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
        center: null,
        quizmap: null,
        lastValidCenter: null,
    }

    // Set Game Over GeoJson styling
    setStyles = (map) => {
        map.data.setStyle({
            fillColor: '#FF0000'
        })
    }

    // TO-DO 
    // setChangeCenter = () => {
    //     this.state.quizmap.addListener('tilesloaded', (e) => {
    //         console.log('setting new center')
    //         let newCenter = this.state.quizmap.getCenter()
    //         this.setState({ center: newCenter })
    //         console.log('new center set')
    //     })
    // }

    // Set Mouse Event listeners to reveal names of added Countries, reverts to ? when mouse leaves area
    setMouseListener = () => {
        this.state.quizmap.data.addListener('mouseover', (e) => {
            this.props.setHoverInfo(e.feature.l.admin)
        })
        this.state.quizmap.data.addListener('mouseout', (e) => {
            this.props.setHoverInfo("???????????????")
        })
    }

    //Set listeners on map events to check the valid latitude of the map (roughly avoids allowing user panning the map off the screen)
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

    //
    setFeatureListener = () => {

        // Add a listener to Google Maps' 'addfeature' event
        this.state.quizmap.data.addListener('addfeature', (e) => {

            // Override the base styling fillColor and replace with color determined by the secondsRemaining
            this.state.quizmap.data.overrideStyle(e.feature, setFillColor(this.props.secondsRemaining, this.props.quizType))

            // Creates the map's panto new Correct Answer feature
            if (e.feature.getGeometry().getType() === 'Polygon' || e.feature.getGeometry().getType() === 'MultiPolygon') {

                // Create a new bounds object
                var bounds = new google.maps.LatLngBounds();

                // Depending on the polygon type loop through the data's points 
                //extend the bounds if they are wider/taller than the previous bounds
                e.feature.getGeometry().getArray().forEach(function (path) {

                    if (e.feature.getGeometry().getType() === 'Polygon') {
                        path.getArray().forEach(function (latLng) {
                            bounds.extend(latLng);
                        })
                    } else if (e.feature.getGeometry().getType() === 'MultiPolygon') {
                        path.getArray().forEach(function (nestedPath) {
                            nestedPath.getArray().forEach(function (latLng) {
                                //extend the bounds
                                bounds.extend(latLng);
                            })
                        })
                    }

                });

                //Once the maximum bounds have been set, pan the map to those bounds with 150px padding
                this.state.quizmap.panToBounds(bounds, 150);
                // this.state.quizmap.setCenter(newCenter) // TO-DO

            }
        })
    }

    // Checks the map's bounds to ensure that the map is still within view, if not the maps center is reverted
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

    // At end of game unAnswered array is populated and the map loops through each country to load it's GeoJson polygon
    loadUnaswered = (unansweredArr) => {
        unansweredArr.forEach((unAnsweredCountry) => {
            API.loadCountry(this.state.quizmap, unAnsweredCountry);
        })
    }

    // When game is restarted all of the map data is removed to have clean display for the new game
    clearMap = (map) => {
        map.data.forEach(item => map.data.remove(item))
    }

    //Using the quizType prop, the map's center is set to the relevant continent. (Default center is Gritty's hometown.)
    componentDidMount() {
        switch (this.props.quizType) {
            case ('north-america'):
                this.setState({ center: { lat: 48.3552767, lng: -99.9995795 } })
                break
            case ('south-america'):
                this.setState({ center: { lat: -15.6014, lng: -56.0979 } })
                break
            case ('europe'):
                this.setState({ center: { lat: 54.5260, lng: 15.2551 } })
                break
            case ('africa'):
                this.setState({ center: { lat: -8.7832, lng: 34.5085 } })
                break
            case ('asia'):
                this.setState({ center: { lat: 34.0479, lng: 100.6197 } })
                break
            case ('oceania'):
                this.setState({ center: { lat: -22.7359, lng: 140.0188 } })
                break
            default:
                this.setState({ center: { lat: 39.9526, lng: -75.1652 } })
        }
    }

    componentDidUpdate(prevProps) {
        // When the game starts, Google Map's event listeners are set
        if (!prevProps.gameStarted && this.props.gameStarted) {
            this.setStyles(this.state.quizmap);
            this.setOutOfBoundsListener();
            this.setFeatureListener();
            this.setMouseListener();
        }

        // If a new correct guess is made, the API is called to load the new Country's polygon on the map
        if (prevProps.correctGuess !== this.props.correctGuess) {
            API.loadCountry(this.state.quizmap, this.props.correctGuess);
        }

        // If the game's gameOver state is change from true to false, a new game is started and the map's display is cleared
        if (prevProps.gameOver && !this.props.gameOver) {
            this.clearMap(this.state.quizmap)
            this.setFeatureListener();
        }

        // If the unAnsweredArr prop is no longer null, the game has ended. 
        // The listeners are cleared (to avoid erratic panning, style overrides) and the loadUnswered countries function is called
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