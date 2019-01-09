const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({

});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;