import React, { Component } from "react";
import Header from "./Header";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "22222222",
		};
	}

	render() {
		return (
			<div>
				<Header title={"DARE Progress"} nobutton={true} />
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
