import axios from "axios";

export default {
    loadCountry: (countryName, map) => {
        if (countryName) {
            // console.log(map);
            axios.get("/api/" + countryName)
                .then(response => {
                    console.log(response.data);
                    let addedCountry = map.data.addGeoJson(response.data, { idPropertyName: response.data.properties.ADMIN })
                    console.log(addedCountry);
                    console.log(map.data.contains('Cuba'));
                })
        }
    }
}