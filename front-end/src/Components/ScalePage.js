import React, { Component } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getHistory } from "../Services/Requests";
import { MapType } from "../Services/QuestionnaireTypes";
import Header from "./Header";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			chartData: undefined,
			type: MapType(
				decodeURIComponent(this.props.match.params.questionnaireType)
			),
			userID: decodeURIComponent(this.props.match.params.userID),
			loading: true,
		};
	}

	render() {
		return (
			<div>
				<Header title={this.state.type} />
				{!this.state.loading ? this.renderGraph() : undefined}
			</div>
		);
	}

	componentDidMount() {
		this.requestData();
	}

	componentWillReceiveProps(props, state) {
		if (
			props.match.params.questionnaireType !== state.type &&
			props.match.params.userID !== state.userID
		) {
			this.requestData();
		}
		this.setState({
			type: MapType(
				decodeURIComponent(props.match.params.questionnaireType)
			),
			user: decodeURIComponent(props.match.params.userID),
			loading: true,
		});
	}

	renderGraph() {
		return (
			<div className="chart-area">
				<div className="graph-parent">
					<div className="chart">
						<ResponsiveLine
							onClick={(point, event) =>
								this.handlePointClick(point)
							}
							data={this.state.chartData}
							margin={{
								top: 50,
								right: 0,
								bottom: 50,
								left: 0,
							}}
							enableGridX={false}
							enableGridY={false}
							xScale={{ type: "point" }}
							yScale={{
								type: "linear",
								stacked: false,
								min: "auto",
								max: "auto",
							}}
							curve="cardinal"
							axisTop={null}
							axisRight={null}
							colorBy={(d) => d.color}
							axisBottom={null}
							axisLeft={null}
							pointSize={2}
							pointColor={{ theme: "background" }}
							pointBorderWidth={4}
							pointBorderColor={"#FF9F5A"}
							lineWidth={6}
							pointLabel="y"
							pointLabelYOffset={-12}
							useMesh={false}
							legends={[]}
						/>
					</div>
				</div>
			</div>
		);
	}

	handlePointClick(point) {
		console.log(point.data.x);
		this.props.history.push(
			`/${this.state.type.toLowerCase()}/${this.state.userID}/${
				point.data.x
			}`
		);
	}

	async requestData() {
		const lineChartData = [];
		const data = await getHistory(this.state.userID, this.state.type);
		lineChartData.push(this.createLineChartData(data)[0]);

		this.setState({
			chartData: lineChartData,
			loading: false,
		});
	}

	createLineChartData(data) {
		const lineChartData = [
			{
				id: this.state.type,
				data: new Array(data.length),
				color: "#FF9F5A",
			},
		];

		for (let i = 0; i < data.length; i++) {
			lineChartData[0].data[i] = {
				x: i,
				y: data[i],
			};
		}

		return lineChartData;
	}
}

export default HomePage;
