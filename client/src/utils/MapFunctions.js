
/* global google */
const MapFunctions = {

    setStyles: (map) => {
        map.data.setStyle({
            fillColor: '#FF0000'
        })
    },

    setOutOfBoundsListener: () => {
        this.state.quizmap.addListener('dragend', () => {
            this.checkLatitude(this.state.quizmap);
        });
        this.state.quizmap.addListener(this.state.quizmap, 'idle', () => {
            this.checkLatitude(this.state.quizmap);
        });
        this.state.quizmap.addListener(this.state.quizmap, 'zoom_changed', () => {
            this.checkLatitude(this.state.quizmap);
        });
    },

    setFeatureListener: () => {
        this.state.quizmap.data.addListener('addfeature', (e) => {
            //check for a polygon
            if (e.feature.getGeometry().getType() === 'Polygon' || e.feature.getGeometry().getType() === 'MultiPolygon') {
                // //initialize the bounds
                console.log(e)
                var bounds = new google.maps.LatLngBounds();
                console.log(bounds);

                //iterate over the paths
                e.feature.getGeometry().getArray().forEach(function (path) {

                    //
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

                console.log(bounds);

                // now use the bounds
                e.feature.setProperty('bounds', bounds);

                this.state.quizmap.fitBounds(bounds);

                // console.log(e);

            }
        })
    },


    checkLatitude: (map) => {
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
    },

    clearMap: (map) => {
        map.data.forEach(item => map.data.remove(item))
    }

}

export default MapFunctions