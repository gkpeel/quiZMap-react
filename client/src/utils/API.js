import axios from "axios";

export default {
    loadCountry: (map, countryName) => {
        console.log(countryName);
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