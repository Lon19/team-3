import React, { Component } from "react";
import Header from "./Header";
import { MapType } from "../Services/QuestionnaireTypes";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: MapType(decodeURIComponent(this.props.match.params.questionnaireType)),
			userID: decodeURIComponent(this.props.match.params.userID),
		};
	}

	render() {
		return (
			<div>
				<Header title={this.state.type} />
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
			</div>
		);
	}
}

export default TextPage;
