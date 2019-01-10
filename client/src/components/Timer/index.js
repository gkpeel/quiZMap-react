import React, { Component } from "react";

class Timer extends Component {
    state = {
        minutes: 15,
        seconds: '00',
        inOn: false
    }
    secondsRemaining;
    intervalHandle;

    tick = () => {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);

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

        this.secondsRemaining--
    }

    startCountDown = () => {
        console.log('here');
        this.setState({ isOn: true });
        let time = this.state.minutes;
        this.secondsRemaining = time * 60;
        this.intervalHandle = setInterval(this.tick, 1000);
    }

    pauseCountDown = () => {
        this.setState({ inOn: false });
        clearInterval(this.intervalHandle);
    }

    render() {
        return (
            <div>
                <h1>{this.state.minutes}:{this.state.seconds}</h1>
                <button className="btn btn-primary" onClick={this.state.isOn ? this.pauseCountDown : this.startCountDown}>
                    {this.state.isOn ? 'Pause' : 'Start'}
                </button>
            </div>
        )
    }
}


export default Timer;