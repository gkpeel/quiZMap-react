import React, { Component } from "react";
import axios from "axios";
import Scoreboard from "../Scoreboard";
import Country from "../Country";

class CountryGuess extends Component {
    state = {
        currentGuess: "",
        countriesToGuess: [],
        countriesGuessed: [],
    }


    checkGuess = () => {
        if (this.state.countriesToGuess.includes(this.state.currentGuess)) {
            console.log('guessed a new country');
            this.state.countriesGuessed.push(this.state.currentGuess);
            this.setState({
                currentGuess: ""
            })
        }
    }

    // when component loads get the list of countries to guess
    componentDidMount() {
        axios.get("/api/countries")
            .then(response => {
                console.log(response);
                const countryArray = [];
                response.data.forEach(countryObj => {
                    countryArray.push(countryObj.properties.ADMIN);
                })
                console.log(countryArray);
                this.setState({
                    countriesToGuess: countryArray
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    // update value of the component's state.currentGuess
    handleInputChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        }, this.checkGuess);

    };

    render() {
        return (
            <div>
                <form className="form guess-input" style={{ marginBottom: "2rem" }}>
                    <input
                        type="text"
                        name="currentGuess"
                        placeholder="Start typing country names here"
                        value={this.state.currentGuess}
                        onChange={this.handleInputChange}
                        disabled={!this.props.timerRunning}
                    />
                </form>
                <div className="all-countries">
                    {this.state.countriesToGuess.map((country, i) =>
                        <Country key={i} country={country} guessed={this.state.countriesGuessed.includes(country) ? true : false} />
                    )}
                </div>

                <Scoreboard
                    countriesGuessed={this.state.countriesGuessed.length}
                    countriesToGuess={this.state.countriesToGuess.length}
                />
            </div>
        )

    }
}

export default CountryGuess;