import React, { Component } from "react";

class GuessInput extends Component {
    state = {
        val: ''
    }

    setValue = (e) => {
        let value = e.target.value;
        this.setState({ val: value })
        this.props.callbackFromSidebar(this.state.val);
    }


    render() {
        return (
            <input
                value={this.state.val}
                name="val"
                type="text"
                onChange={this.setValue}>
            </input>
        )
    }
}

export default GuessInput;