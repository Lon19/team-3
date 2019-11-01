import React from "react";
import "./App.css";
import HomePage from "./HomePage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={HomePage} />
      <Route path="/:questionnaire" component={HomePage} />
    </Router>
  );
}

export default App;
