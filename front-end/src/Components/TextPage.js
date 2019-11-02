import React, { Component } from "react";
import Header from "./Header";
import { MapType } from "../Services/QuestionnaireTypes";
import HorizontalTimeline from "react-horizontal-timeline";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: MapType(decodeURIComponent(this.props.match.params.questionnaireType)),
			userID: decodeURIComponent(this.props.match.params.userID),
			value: 0, previous: 0
		};

		if (!this.state.type) {
			this.state.type = "Adjustments";
		}
	}

	VALUES = ["0/2/23", "1/2/32", "2/3/42"];

	render() {
		return (
			<div>
				<Header title={this.state.type} />
				<div classname="TextPage">
					<div
						style={{
							width: "60%",
							height: "100px",
							margin: "0 auto",
						}}
					>
						<HorizontalTimeline
							index={this.state.value}
							indexClick={(index) => {
								this.setState({
									value: index,
									previous: this.state.value,
								});
							}}
							values={this.VALUES}
						/>
					</div>
					<div className="TextPage-main">questionnaire goes here</div>
				</div>
			</div>
		);
	}
}

export default TextPage;
