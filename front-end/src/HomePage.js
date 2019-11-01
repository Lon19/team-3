import React, { Component } from "react";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="Homepage-layout">
				<button className="HomePage-button">Mental Health</button>
				<button className="HomePage-button">Adjustments</button>
				<button className="HomePage-button">
					Work Self Confidence
				</button>
				<button className="HomePage-button">
					Organisational Culture
				</button>
			</div>
		);
	}
}

export default HomePage;
