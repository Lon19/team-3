import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ScalePage from "./Components/ScalePage";
import TextPage from "./Components/TextPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:questionnaireType/:userID/:date" component={TextPage} />
        <Route path="/adjustments/:userID" component={TextPage} />
        <Route path="/:questionnaireType/:userID" component={ScalePage} />
      </Switch>
    </Router>
  );
}

export default App;
