import axios from "axios";

export default {
    loadCountry: (countryName, map) => {
        // console.log(map);
        axios.get("/api/" + countryName)
            .then(response => {
                return response;
            })
    }
}