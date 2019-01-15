import axios from "axios";

export default {
    loadCountry: (countryName, map) => {
        if (countryName) {
            axios.get("/api/" + countryName)
                .then(response => {
                    map.data.addGeoJson(response.data, { idPropertyName: response.data.properties.ADMIN })
                })
        }
    }
}