import axios from "axios";

export default {
    loadCountry: (map, countryName) => {
        if (countryName) {
            axios.get("/api/" + countryName)
                .then(response => {
                    map.data.addGeoJson(response.data, { idPropertyName: response.data.properties.ADMIN })
                })
        }
    }
}