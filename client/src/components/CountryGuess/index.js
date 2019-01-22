import React, { Component } from "react"
import axios from "axios"
import Scoreboard from "../Scoreboard"
import Country from "../Country"
import { EdgeCases } from "../../utils/EdgeCases.js"
import "./index.css"

class CountryGuess extends Component {

    state = {
        currentGuess: "",
        countriesToGuess: [],
        countriesGuessed: [],
    }

    focusTextInput = () => {
        this.textInput.current.focus()
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

    buildList = (response) => {
        const countryArray = [];
        response.data.forEach(countryObj => {
            countryArray.push(countryObj.properties.admin);
        })
        this.setState({
            countriesToGuess: countryArray
        });
        this.props.setMaxScore(this.state.countriesToGuess.length);
    }

    checkGuess = () => {
        if (this.checkCountriesToGuess() || this.checkEdgeCases()) {
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
            this.state.countriesGuessed.push(this.capitalizedCountry());
            return true
        }
    }

    checkEdgeCases = () => {
        let edgeCaseGuess = this.capitalizedCountry()
        if (EdgeCases[edgeCaseGuess]
            && !this.state.countriesGuessed.includes(EdgeCases[edgeCaseGuess])
            && this.state.countriesToGuess.includes(EdgeCases[edgeCaseGuess])) {
            this.props.correctGuess(EdgeCases[edgeCaseGuess])
            this.state.countriesGuessed.push(EdgeCases[edgeCaseGuess])
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
        console.log(retval)
        this.props.getUnanswered(retval);
    }

    submitHandler = event => {
        event.preventDefault()
    }

    // when component loads get the list of countries to guess
    componentDidMount() {
        if (this.props.quizType) {
            axios.get("/api/continent/" + this.props.quizType)
                .then(response => {
                    console.log(response)
                    return this.buildList(response);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.get("/api/continent/world")
                .then(response => {
                    return this.buildList(response);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.timerRunning) {
            this.countryInput.focus()
        }
        if (prevProps.gameOver && !this.props.gameOver) {
            this.setState({ countriesGuessed: [] })
        }
        if (!prevProps.gameOver && this.state.countriesGuessed.length === this.state.countriesToGuess.length) {
            this.props.endGame()
        }
        if (!prevProps.gameOver && this.props.gameOver) {
            this.getUnanswered()
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
                <div className="form-container">
                    <form onSubmit={this.submitHandler} className="form guess-input">
                        <input
                            type="text"
                            name="currentGuess"
                            className="currentGuess"
                            placeholder="Start typing country names here"
                            value={this.state.currentGuess}
                            onChange={this.handleInputChange}
                            disabled={!this.props.timerRunning}
                            ref={(input) => { this.countryInput = input; }}
                        />
                    </form>
                    <Scoreboard
                        countriesGuessed={this.state.countriesGuessed.length}
                        countriesToGuess={this.state.countriesToGuess.length}
                    />
                </div>
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