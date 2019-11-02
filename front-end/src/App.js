import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ScalePage from "./Components/ScalePage";
import TextPage from "./Components/TextPage";

function App() {
	return (
		<Router>
			<Route exact path="/" component={HomePage} />
			<Route path="/adjustments/:userID" component={TextPage} />
			<Route path="/mental health/:userID" component={ScalePage} />
			<Route path="/work self confidence/:userID" component={ScalePage} />
			<Route
				path="/organisational culture/:userID"
				component={ScalePage}
			/>
		</Router>
	);
}

export default App;
