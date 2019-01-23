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

    // when component loads, use quizType prop to get the list of countries to guess from the database
    componentDidMount() {
        if (this.props.quizType) {
            axios.get("/api/continent/" + this.props.quizType)
                .then(response => {
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
        // If the timer is running, use currentGuess's countryInput ref to set the focus
        if (this.props.timerRunning) {
            this.countryInput.focus()
        }

        // If the <Game/>'s gameOver state switches from true to false, a new game has started, clear the countriesGuessed array
        if (prevProps.gameOver && !this.props.gameOver) {
            this.setState({ countriesGuessed: [] })
        }

        // If the <Game/> gameOver state is not true
        // And the length of the countriesGuessed array is equal to the countriesToGuess array
        // The game has been won, tell the <Game/> that the game is over
        if (!prevProps.gameOver && this.state.countriesGuessed.length === this.state.countriesToGuess.length) {
            this.props.endGame()
        }

        // If the <Game/> gameOver state goes from false to true,
        // presumably the time has expired or the user has given up and triggered the state change
        // collect all the unanswered countries and pass them to <Game/> so that they can be passed to <Map/>
        if (!prevProps.gameOver && this.props.gameOver) {
            this.getUnanswered()
        }
    }

    // Using the response from the server, build an array of countries for the user to guess
    // Push the array's length up to the <Game/> component so that the maxScore can be set for <Overlay/> display
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


    // See if the currentGuess passed either the checkCountriesToGuess OR the checkEdgeCases tests
    // If they do, pass the length of countriesGuessed to <Game/> (so it can go to <Overlay/>), clear the currentGuess value
    checkGuess = () => {
        if (this.checkCountriesToGuess() || this.checkEdgeCases()) {
            this.props.setScore(this.state.countriesGuessed.length);
            this.setState({
                currentGuess: ""
            })
        };
    }

    // After appropriate formatting, see if the value exists in the countriesToGuess array and is not already in countriesGuessed array
    // If condition is met, send this correct answer to <Game/> (so it can be passed to <Map/>)
    // Push the value to the countriesGuessed array, and return true so that checkGuess() can continue
    checkCountriesToGuess = () => {
        if (this.state.countriesToGuess.includes(this.capitalizedCountry())
            && !this.state.countriesGuessed.includes(this.capitalizedCountry())) {
            this.props.correctGuess(this.capitalizedCountry());
            this.state.countriesGuessed.push(this.capitalizedCountry());
            return true
        }
    }

    // After appropriate formatting, see if the value exists in: the EdgeCase object, the countriesToGuess array, and is not in countriesGuessed array
    // If condition is met, send this correct answer to <Game/> (so it can be passed to <Map/>)
    // Push the value to the countriesGuessed array, and return true so that checkGuess() can continue
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

    // Find all the countries in the countriesToGuess array that are not in the countriesGuessed array
    // Push that returned value to <Game/> (so that is can be passed to <Map/>)
    getUnanswered = () => {
        let retval = [];
        this.state.countriesToGuess.forEach((country) => {
            if (!this.state.countriesGuessed.includes(country)) {
                retval.push(country);
            }
        })
        this.props.getUnanswered(retval);
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

    // Before checking the user's input format their guess by capitalizing the first letter of each word
    // Avoid capitalizing words "and", "of", or "the" (unless this begins the name of a country *cough*The Bahamas*cough*)
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

    //prevent page refresh if a user presses enter during guess input
    submitHandler = event => {
        event.preventDefault()
    }

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