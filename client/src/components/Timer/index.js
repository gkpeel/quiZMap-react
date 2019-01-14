import React, { Component } from "react";

const buttonStyling = {
    flex: "1 0 auto",
    display: "block",
    margin: "0.25rem"
}

class Timer extends Component {
    state = {
        secondsRemaining: 899,
        seconds: "00",
    }
    intervalHandle;

    gameStart = () => {
        if (this.props.timerRunning) {
            this.startCountDown()
        }
    }

    gamePause = () => {
        if (!this.props.timerRunning) {
            this.pauseCountDown();
        }
    }

    setMins = () => {
        var min = Math.floor((this.state.secondsRemaining + 1) / 60);
        this.setState({ minutes: min })
    }

    componentDidMount() {
        this.setMins();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.timerRunning && this.props.timerRunning) {
            this.gameStart();
        }
        if (prevProps.timerRunning && !this.props.timerRunning) {
            this.gamePause();
        }
    }

    tick = () => {
        var min = Math.floor(this.state.secondsRemaining / 60);
        var sec = this.state.secondsRemaining - (min * 60);

        this.setState({
            minutes: min,
            seconds: sec
        })

        if (sec < 10) {
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

        this.state.secondsRemaining--
    }

    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    pauseCountDown = () => {
        clearInterval(this.intervalHandle);
    }

    resetCountDown = () => {
        this.pauseCountDown();
        this.setState({
            secondsRemaining: 899,
            seconds: "00",
            isOn: false
        })
        this.setMins();
    }

    render() {
        return (
            <div>
                <h1 className="display-3 text-center">
                    {this.state.minutes}:{this.state.seconds}
                </h1>
                <div className="d-flex">
                    <button onClick={this.props.toggleTimer} style={buttonStyling} className="btn btn-primary">
                        {this.props.timerRunning ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={this.resetCountDown} style={buttonStyling} className="btn btn-danger">
                        Restart
                </button>
                </div>
            </div>
        )
    }
}


export default Timer;