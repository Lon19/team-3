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
			value: 0,
			previous: 0,
			data: [{ question: "Was you sad today?", answer: "I was." }, { question: "Was you sad today?", answer: "I was." }]
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
				<div className="textPage">
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
							styles={{ background: '#ffffff', foreground: '#7b9d6f', outline: '#dfdfdf' }}
						/>
					</div>
					<div className="textPage-questions">
						{this.state.data.map((question) =>
							<div className="textPage-box">
								<div className="textPage-question">{question.question}</div>
								<div className="textPage-answer">{question.answer}</div>
							</div>)}
					</div>
				</div>
			</div>
		);
	}
}

export default TextPage;
