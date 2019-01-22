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

    componentWillMount() {
        if (this.props.quizType === "europe" || this.props.quizType === "oceania") {
            this.setState({ secondsRemaining: 480 })
        } else if (this.props.quizType === "africa" || this.props.quizType === "asia" || this.props.quizType === "north-america") {
            this.setState({ secondsRemaining: 600 })
        } else if (this.props.quizType === "south-america") {
            this.setState({ secondsRemaining: 300 })
        }
    }

    componentDidMount() {
        this.setMins();
    }

    componentDidUpdate(prevProps, prevState) {

        if (!prevProps.timerRunning && this.props.timerRunning) {
            // this.gameStart()
            this.startCountDown()
        }
        if (prevProps.timerRunning && !this.props.timerRunning) {
            // this.gamePause()
            this.pauseCountDown()
        }
        if (!prevProps.gameOver && this.props.gameOver) {
            this.setState({
                seconds: "00",
                minutes: 0,
                secondsRemaining: 0
            })
        }
        if (prevProps.gameOver && !this.props.gameOver) {
            this.setState({ secondsRemaining: 899 })
            this.props.startGame()
        }
        if (!prevProps.gameOver && this.state.secondsRemaining === 0) {
            this.props.endGame();
        }
    }

    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    pauseCountDown = () => {
        clearInterval(this.intervalHandle);
    }

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

    setMins = () => {
        var min = Math.floor((this.state.secondsRemaining + 1) / 60);
        this.setState({ minutes: min })
    }

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

    render() {
        return (
            <div>
                <h1 className="display-3 text-center" style={{ color: "#fff" }}>
                    {this.state.minutes}:{this.state.seconds}
                </h1>
                <div className="d-flex">
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