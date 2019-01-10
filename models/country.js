const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    type: { type: String },
    geometry: {
        type: { type: String },
        coordinates: {
            type: Array,
            required: true
        }
    },
    properties: {
        'ADMIN': { type: String },
        'ISO_A3': { type: String }
    }

});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;