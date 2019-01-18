import React, { Component } from "react";
import axios from "axios";
import Scoreboard from "../Scoreboard";
import Country from "../Country";
import { EdgeCases } from "../../utils/EdgeCases.js";

class CountryGuess extends Component {
    state = {
        currentGuess: "",
        countriesToGuess: [],
        countriesGuessed: [],
    }

    capitalizedCountry = () => {
        return this.state.currentGuess.toLowerCase().split(' ').map((word, i) => {
            if (i === 0 && word === "the") {
                return word.charAt(0).toUpperCase() + word.slice(1)
            }
            if (word !== "and" && word !== "of" && word !== "the") {
                return word.charAt(0).toUpperCase() + word.slice(1)
            } else {
                return word
            }
        }).join(' ');
    }

    checkGuess = () => {
        if (this.checkCountriesToGuess() || this.checkEdgeCases()) {
            this.state.countriesGuessed.push(this.capitalizedCountry());
            this.props.setScore(this.state.countriesGuessed.length);
            this.setState({
                currentGuess: ""
            })
        };
    }

    checkCountriesToGuess = () => {
        if (this.state.countriesToGuess.includes(this.capitalizedCountry())
            && !this.state.countriesGuessed.includes(this.capitalizedCountry())) {
            this.props.correctGuess(this.capitalizedCountry());
            return true;
        }
    }

    checkEdgeCases = () => {
        let edgeCaseGuess = this.capitalizedCountry()
        if (EdgeCases[edgeCaseGuess]) {
            console.log(EdgeCases[edgeCaseGuess])
            this.props.correctGuess(EdgeCases[edgeCaseGuess]);
            return true
        }
    }

    getUnanswered = () => {
        let retval = [];
        this.state.countriesToGuess.forEach((country) => {
            if (!this.state.countriesGuessed.includes(country)) {
                retval.push(country);
            }
        })
        this.props.getUnanswered(retval);
    }

    submitHandler = event => {
        event.preventDefault()
    }

    // when component loads get the list of countries to guess
    componentDidMount() {
        axios.get("/api/countries")
            .then(response => {
                const countryArray = [];
                response.data.forEach(countryObj => {
                    countryArray.push(countryObj.properties.ADMIN);
                })
                this.setState({
                    countriesToGuess: countryArray
                });
                this.props.setMaxScore(this.state.countriesToGuess.length);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.gameOver && !this.props.gameOver) {
            this.setState({ countriesGuessed: [] })
        }
        if (!prevProps.gameOver && this.state.countriesGuessed.length === this.state.countriesToGuess.length) {
            this.props.endGame()
        }
        if (!prevProps.gameOver && this.props.gameOver) {
            this.getUnanswered();
        }
    }

    // update value of the component's state.currentGuess
    handleInputChange = event => {
        event.preventDefault()
        const value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.checkGuess)
    };

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <form onSubmit={this.submitHandler} className="form guess-input" style={{ marginBottom: "2rem" }}>
                    <input
                        type="text"
                        name="currentGuess"
                        placeholder="Start typing country names here"
                        value={this.state.currentGuess}
                        onChange={this.handleInputChange}
                        disabled={!this.props.timerRunning}
                    />
                </form>
                <Scoreboard
                    countriesGuessed={this.state.countriesGuessed.length}
                    countriesToGuess={this.state.countriesToGuess.length}
                />
                <div className="all-countries" style={{ overflow: "scroll" }}>
                    {this.state.countriesToGuess.map((country, i) =>
                        <Country
                            key={i}
                            country={country}
                            guessed={this.state.countriesGuessed.includes(country) ? true : false}
                            gameOver={this.props.gameOver}
                        />
                    )}
                </div>
            </div>
        )

    }
}

export default CountryGuess;