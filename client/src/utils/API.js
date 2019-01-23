import axios from "axios";

// call the database with the correctGuess's value, add the response data (GeoJson coordinates) to the map
export default {
    loadCountry: (map, countryName) => {
        if (countryName) {
            axios.get("/api/" + countryName)
                .then(response => {
                    map.data.addGeoJson(response.data, { idPropertyName: response.data.properties.admin })
                })
                .catch(err => {
                    console.log(countryName, err)
                })
        }
    }
}