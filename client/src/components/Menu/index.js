import React, { Component } from "react";
import "./index.css"


class Menu extends Component {
    state = {
        active: false
    }

    // Toggle the menu's state to reveal/hide the menu
    toggleActivity = () => {
        let currentState = this.state.active;
        this.setState({ active: !currentState })
    }

    render() {
        return (
            <div className={this.state.active ? "menu-container" : "menu-container inactive"}>

                <div className="menu p-4">
                    <h2 className="mb-3">Quizzes</h2>
                    <ul className="nav main-nav flex-column">
                        <li className="nav-item">
                            <a className={this.props.quizType === null || this.props.quizType === undefined ? "active" : ""} href="/">World</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "north-america" ? "active" : ""} href="/north-america">North America</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "south-america" ? "active" : ""} href="/south-america">South America</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "europe" ? "active" : ""} href="/europe">Europe</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "africa" ? "active" : ""} href="/africa">Africa</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "asia" ? "active" : ""} href="/asia">Asia</a>
                        </li>
                        <li className="nav-item">
                            <a className={this.props.quizType === "oceania" ? "active" : ""} href="/oceania">Oceania</a>
                        </li>
                    </ul>
                    <hr />
                    <a className="d-block" style={{ color: "#fff" }} href="/about">About</a>
                </div>
                <button className="btn btn-lg menu-button" onClick={this.toggleActivity}>Menu</button>
            </div>
        )
    }
}

export default Menu