import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Components/HomePage";
import SettingsPage from "./Components/SettingsPage";
import ScalePage from "./Components/ScalePage";
import TextPage from "./Components/TextPage";
import { StoreValue } from "./Services/Cookies";

function App() {

	return (
		<Router>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route
					path="/:questionnaireType/:userID/:date"
					component={TextPage}
				/>
				<Route path="/adjustments/:userID" component={TextPage} />
				<Route
					path="/:questionnaireType/:userID"
					component={ScalePage}
				/>
				<Route exact path="/settings" component={SettingsPage} />
			</Switch>
		</Router>
	);
}

export default App;
