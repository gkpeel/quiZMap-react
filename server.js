require("dotenv").config();
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// DB Stuff
const mongoose = require("mongoose");
const db = require('./models');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to the Mongo DB
mongoose.connect((process.env.MONGODB_URI || "mongodb://localhost/worldcountries"), { useNewUrlParser: true });

//collect the list of countries to guess and place them in alphabetical order
app.get("/api/continent/world", (req, res) => {
  db.Country
    .find({ "properties.type": { $in: ["Sovereign country", "Country"] } }, { "properties.admin": 1 }, { sort: { 'properties.admin': 1 } })
    .then(dbModel => { res.json(dbModel) })
    .catch(err => res.status(422).json(err));
})

app.get("/api/continent/:continent", (req, res) => {
  var continent = req.params.continent.split('-').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join(' ')
  db.Country
    .find({ "properties.type": { $in: ["Sovereign country", "Country"] }, "properties.continent": continent }, { "properties.admin": 1 }, { sort: { 'properties.admin': 1 } })
    .then(dbModel => { res.json(dbModel) })
    .catch(err => res.status(422).json(err));
})

// return the correctGuess GeoJSON object
app.get("/api/:country", (req, res) => {
  db.Country
    .findOne({ "properties.admin": req.params.country })
    .then(dbModel => { res.json(dbModel) })
    .catch(err => console.log(err))
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
