import React, { Component } from "react";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "1324324",
		};
	}

	render() {
		return (
			<div>
				<button
					className="HomePage-button"
					onClick={() => this.handleClick("Mental Health")}
				>
					Mental Health
				</button>
				<button
					className="HomePage-button"
					onClick={() => this.handleClick("Adjustments")}
				>
					Adjustments
				</button>
				<button
					className="HomePage-button"
					onClick={() => this.handleClick("Work Self Confidence")}
				>
					Work Self Confidence
				</button>
				<button
					className="HomePage-button"
					onClick={() => this.handleClick("Organisational Culture")}
				>
					Organisational Culture
				</button>
			</div>
		);
	}

	handleClick(type) {
		this.props.history.push(`/${type.toLowerCase()}/${this.state.userID}`);
	}
}

export default HomePage;
