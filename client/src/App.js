import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Game from "./components/Game"
import "./App.css"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Game} />
          <Route exact path="/:quizType" component={Game} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;