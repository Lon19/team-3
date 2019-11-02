import React, { Component } from "react";
import Header from "./Header";
import { MapType } from "../Services/QuestionnaireTypes";
import HorizontalTimeline from "react-horizontal-timeline";
import { getHistory } from "../Services/Requests";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: MapType(decodeURIComponent(this.props.match.params.questionnaireType)),
			userID: decodeURIComponent(this.props.match.params.userID),
			date: undefined,
			previous: 0,
			dataMap: [{ question: "Was you sad today?", answer: "I was." }, { question: "Was you sad today?", answer: "I was." }]
		};

		if (!this.state.type) {
			this.state.type = "Adjustments";
		}
	}

	componentDidMount() {
		this.requestData();
	}

	componentWillReceiveProps(props, state) {
		if (
			props.match.params.questionnaireType !== state.type &&
			props.match.params.userID !== state.userID &&
			props.match.params.date !== state.date
		) {
			this.requestData();
		}
		this.setState({
			type: MapType(
				decodeURIComponent(props.match.params.questionnaireType)
			),
			user: decodeURIComponent(props.match.params.userID),
			date: decodeURIComponent(props.match.params.date),
			loading: true,
		});
	}

	VALUES = ["1/2/19", "2/2/19", "3/2/19"];

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
							className="HorizontalTimeLine"
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
						{this.state.dataMap.map((question) =>
							<div className="textPage-box">
								<div className="textPage-question">{question.question}</div>
								<div className="textPage-answer">{question.answer}</div>
							</div>)}
					</div>
				</div>
			</div>
		);
	}

	async requestData() {
		let dataMap = {};
		let values = [];
		const data = await getHistory(this.state.userID);

		if (!data) {
			return;
		}

		for (let datum of data) {
			dataMap[datum.date] = datum;
			values.push(datum)
		}

		this.setState({
			dataMap,
			loading: false,
			values,
		});
	}
}

export default TextPage;
