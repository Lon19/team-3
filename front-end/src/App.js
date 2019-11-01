import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/:questionnaireType" component={HomePage} />
    </Router>
  );
}

export default App;
