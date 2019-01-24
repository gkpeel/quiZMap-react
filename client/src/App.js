import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./components/Game"
import About from "./components/About"
import "./App.css"

// The URL determine which countries to load, where the map's center should be, how much time the user is allowed
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Game} />
        <Route exact path="/about" component={About} />
        <Route exact path="/:quizType" component={Game} />
      </Switch>
    </Router>
  );
}

export default App;