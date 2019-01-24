import React from "react"
import SideBar from "../SideBar"
import "./index.css"

const About = () => {
    return (
        <div className="App about-page">
            <SideBar />
            <div className="about__container">
                <div className="intro__container text-right mb-4">
                    <h1 className="display-4 font-concert">About quiZMap</h1>
                    <h2 className="font-weight-light">Test your geographic knowledge</h2>
                </div>
                <div className="body__container">
                    <h4 className="mb-3">How many countries can you name?<br />
                        That's what quiZMap intends to find out.</h4>
                    <h5><u>How to play:</u></h5>
                    <ol className="mb-4">
                        <li>Select a quiz from the menu</li>
                        <li>Click the 'Start' button to start the timer</li>
                        <li>Enter your answers in the input field on the sidebar</li>
                        <li>If you get an answer right, the map will pan to the country and highlight the country<br />
                            <span><em>(The color starts out green but the closer you get to time expiring the redder the color gets.)</em></span>
                        </li>
                        <li>Use the scroll bar to see which countries you've answered and which countries you still need to guess</li>
                        <li>Once time expires you can review the map to see which countries you might have missed</li>
                    </ol>
                    <p><strong>**Remember, that while you don't need to worry about capitalizing your guesses, spelling counts.**</strong></p>
                    <p>Check back in the future for more map features, new difficulty levels, and different quizzes. Have fun!</p>
                </div>
            </div>
        </div>
    )
}

export default About