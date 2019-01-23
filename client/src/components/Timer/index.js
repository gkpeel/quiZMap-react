import React, { Component } from "react";

const style = {
    pause: {
        flex: "1 0 auto",
        display: "block",
        margin: "0.25rem",
        backgroundColor: "#79C9E9",
        borderColor: "#79C9E9"
    },
    quit: {
        flex: "1 0 auto",
        display: "block",
        margin: "0.25rem",
        backgroundColor: "#e97777",
        borderColor: "#e97777"
    }
}

class Timer extends Component {
    state = {
        secondsRemaining: 899,
        seconds: "00",
    }
    intervalHandle;

    // If component will update, set the allotted time for the quiz
    componentWillMount() {
        this.setQuizTime()
    }

    // Set the component's minutes state
    componentDidMount() {
        this.setMins()
    }

    // Depending on the value of the <Game/>'s props passed down toggle Timer
    componentDidUpdate(prevProps) {
        // If the state of <Game/>'s timerRunning changes from false to true, start the timer 
        if (!prevProps.timerRunning && this.props.timerRunning) {
            this.startCountDown()
        }
        // If the state of <Game/>'s timerRunning changes from true to false, pause the timer         
        if (prevProps.timerRunning && !this.props.timerRunning) {
            this.pauseCountDown()
        }
        // If the state of <Game/>'s gameOver changes from false to true, set the timer's value to 00:00
        if (!prevProps.gameOver && this.props.gameOver) {
            this.setState({
                seconds: "00",
                minutes: 0,
                secondsRemaining: 0
            })
        }
        // If the state of <Game/>'s gameOver changes from true to false, set the timer's value to 00:00
        if (prevProps.gameOver && !this.props.gameOver) {
            this.setQuizTime()
            this.props.startGame()
        }
        if (!prevProps.gameOver && this.state.secondsRemaining === 0) {
            this.props.endGame();
        }
    }

    // Call tick() once every 1000ms
    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    // Clear intervalHandle when called
    pauseCountDown = () => {
        clearInterval(this.intervalHandle);
    }

    // Set the state's minutes and seconds, handle issues with single digits
    // Pass secondsRemaining to <Game/> (to then be passed to Map for dynamic color)
    // Decrement secondsRemaining state
    tick = () => {
        var min = Math.floor(this.state.secondsRemaining / 60);
        var sec = this.state.secondsRemaining - (min * 60);

        this.setState({
            minutes: min,
            seconds: sec
        })

        if (sec === 0) {
            this.setState({
                seconds: "00"
            })
        }

        if (sec < 10 && sec > 0) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                value: "0" + min,
            })
        }

        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
        }
        this.props.setSecondsRemaining(this.state.secondsRemaining)
        this.state.secondsRemaining--
    }

    // Set minute state based on the secondsRemaining state
    setMins = () => {
        var min = Math.floor((this.state.secondsRemaining + 1) / 60);
        this.setState({ minutes: min })
    }

    // Render the value of the button according to the <Game/>'s gameStarted state
    renderStartButton = () => {
        if (this.props.gameStarted) {
            if (this.props.timerRunning) {
                return 'Pause'
            } else {
                return 'Resume'
            }
        } else {
            return 'Start'
        }
    }

    // Based on the quizType prop, set the component's secondsRemaining
    setQuizTime = () => {
        if (this.props.quizType === "europe" || this.props.quizType === "oceania") {
            this.setState({ secondsRemaining: 479 })
        } else if (this.props.quizType === "africa" || this.props.quizType === "asia" || this.props.quizType === "north-america") {
            this.setState({ secondsRemaining: 599 })
        } else if (this.props.quizType === "south-america") {
            this.setState({ secondsRemaining: 299 })
        } else {
            this.setState({ secondsRemaining: 899 })
        }
    }

    render() {
        return (
            <div className="timer-container">
                <h1 className="display-3 text-center" style={{ color: "#fff" }}>
                    {this.state.minutes}:{this.state.seconds}
                </h1>
                <div className="buttons-container">
                    <button
                        onClick={this.props.gameStarted ? this.props.toggleTimer : this.props.startGame}
                        style={style.pause}
                        className="btn btn-primary">
                        {this.renderStartButton()}
                    </button>
                    <button
                        onClick={this.props.endGame}
                        style={style.quit}
                        className="btn btn-danger"
                        disabled={!this.props.gameStarted}
                    >
                        Give Up
                    </button>
                </div>
            </div >
        )
    }
}


export default Timer;