import React, { Component } from "react";
import axios from "axios"
import Timer from "../Timer";
import GuessInput from "../GuessInput";
import Scoreboard from "../Scoreboard";
import "./index.css";

class SideBar extends Component {
    state = {
        currentGuess: '',
        countriesToGuess: [],
        countriesGuessed: [],
        seconds: '00',
        minutes: ''
    }

    checkGuess = () => {
        console.log(this.state.countriesToGuess);
        if (!this.state.countriesGuessed.includes(this.state.currentGuess) && this.state.countriesToGuess.includes(this.state.currentGuess)) {
            console.log('guessed a new country');
        }
    }

    guessCallback = (currentGuessInput) => {
        this.setState({ currentGuess: currentGuessInput });
        this.checkGuess(this.state.currentGuess);
        console.log(this.state.currentGuess);
    }


    // when component loads get the list of countries to guess
    componentDidMount() {
        axios.get("/api/countries")
            .then(response => {
                const countryArray = [];
                response.data.forEach(countryObj => {
                    countryArray.push(countryObj.properties.ADMIN);
                })
                return this.setState({ countriesToGuess: countryArray });
            })
            .then(response => {
                console.log(this.state.countriesToGuess)
            })
    }

    render() {
        return (
            <div className="guess-display">
                <div className="guess-container">
                    <h1>Guess a Country</h1>

                    {/* Create a text GuessInput component  */}
                    <GuessInput callbackFromSidebar={this.guessCallback} />

                    {/* Create a CountryList component */}
                    <div className="all-countries"></div>

                    {/* Create a Scoreboard component */}
                    <Scoreboard
                        countriesGuessed={this.state.countriesGuessed.length}
                        countriesToGuess={this.state.countriesToGuess.length}
                    />

                    {/* Timer TO-DOs: Pause Toggle, Trigger SoG/EoG */}
                    <Timer />

                </div>
            </div>
        );
    }
}

export default SideBar;