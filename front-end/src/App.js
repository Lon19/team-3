import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ScalePage from "./Components/ScalePage";

function App() {
	return (
		<Router>
			<Route exact path="/" component={HomePage} />
			<Route path="/:questionnaireType/:userID" component={ScalePage} />
		</Router>
	);
}

export default App;
