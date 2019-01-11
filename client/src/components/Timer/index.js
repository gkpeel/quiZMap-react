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
        inOn: false
    }
    intervalHandle;

    gameStart = () => {
        if (this.props.gameStarted) {
            this.startCountDown();
        }
    }

    componentDidMount() {
        var min = Math.floor((this.state.secondsRemaining + 1) / 60);

        this.setState({
            minutes: min
        })
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
        console.log('here', this.state);
        this.setState({ isOn: true });
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    pauseCountDown = () => {
        this.setState({ isOn: false });
        clearInterval(this.intervalHandle);
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <h1 className="display-3 text-center">
                    {this.state.minutes}:{this.state.seconds}
                </h1>
                <div className="d-flex">
                    <button style={buttonStyling} className="btn btn-primary" onClick={this.state.isOn ? this.pauseCountDown : this.startCountDown}>
                        {this.state.isOn ? 'Pause' : 'Start'}
                    </button>
                    <button style={buttonStyling} className="btn btn-danger">
                        Restart
                </button>
                </div>
            </div>
        )
    }
}


export default Timer;