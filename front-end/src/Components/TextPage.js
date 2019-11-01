import React, { Component } from "react";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="TextPage-layout">
				<div className="TextPage-side-button">
					<button className="TextPage-side-button-text">Last</button>
				</div>
				<div className="TextPage-main-container">
					<div className="TextPage-main">questionnaire goes here</div>
				</div>
				<div className="TextPage-side-button">
					<button className="TextPage-side-button-text">Next</button>
				</div>
			</div>
		);
	}
}

export default TextPage;
