import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./HomePage";
import TextPage from "./Components/TextPage";

function App() {
	return (
		<Router>
			<Route exact path="/" component={TextPage} />
			<Route path="/:questionnaireType" component={TextPage} />
		</Router>
	);
}

export default App;
