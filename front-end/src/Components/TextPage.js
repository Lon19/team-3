import React, { Component } from "react";
import Header from "./Header";
import { MapType } from "../Services/QuestionnaireTypes";
import HorizontalTimeline from "react-horizontal-timeline";
import { getHistory } from "../Services/Requests";
import { GetValue } from "../Services/Cookies";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			type: undefined,
			userID: decodeURIComponent(this.props.match.params.userID),
			date: undefined,
			previous: 0,
			dataMap: {},
			values: [],
			value: 0,
			fontSize: GetValue("font-size"),
		};
		console.log(this.state.fontSize);

		let type = undefined;
		if (props.match.params.questionnaireType) {
			type = MapType(
				decodeURIComponent(props.match.params.questionnaireType)
			);
		} else {
			type = "Adjustments";
		}

		this.state.type = type;
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

		let type = undefined;
		if (props.match.params.questionnaireType) {
			type = MapType(
				decodeURIComponent(props.match.params.questionnaireType)
			);
		} else {
			type = "Adjustments";
		}

		this.setState({
			type,
			userID: decodeURIComponent(props.match.params.userID),
			date: decodeURIComponent(props.match.params.date),
			loading: true,
		});
	}

	render() {
		var fontStyle = { fontSize: this.state.fontSize + "px" };
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
						{this.state.values ? (
							<HorizontalTimeline
								className="HorizontalTimeLine"
								index={this.state.value}
								indexClick={(index) => {
									this.setState({
										value: index,
										previous: this.state.value,
									});
								}}
								values={this.state.values}
								styles={{
									background: "#ffffff",
									foreground: "#7b9d6f",
									outline: "#dfdfdf",
								}}
							/>
						) : (
							undefined
						)}
					</div>
					<div className="textPage-questions">
						{this.state.dataMap[this.state.values[this.state.value]]
							? Object.keys(
									this.state.dataMap[
										this.state.values[this.state.value]
									].data
							  ).map((question) => {
									return (
										<div
											className="textPage-box"
											style={fontStyle}
										>
											<div
												className="textPage-question"
												style={fontStyle}
											>
												{question}
											</div>
											<div
												className="textPage-answer"
												style={fontStyle}
											>
												{
													this.state.dataMap[
														this.state.values[
															this.state.value
														]
													].data[question]
												}
											</div>
										</div>
									);
							  })
							: undefined}
					</div>
				</div>
			</div>
		);
	}

	async requestData() {
		let dataMap = {};
		let values = [];

		if (!this.state.userID || !this.state.type) {
			return;
		}

		const data = await getHistory(this.state.userID, this.state.type);

		if (!data) {
			return;
		}

		for (let datum of data) {
			const split = datum.date.split("/");
			if (+split[0] <= 12) {
				dataMap[datum.date] = datum;
				values.push(datum.date);
			}
		}

		this.setState({
			dataMap,
			loading: false,
			values,
			value: values.length - 1,
		});
	}
}

export default TextPage;
