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
                            pointSize={8}
                            pointColor={{ theme: "background" }}
                            pointBorderWidth={4}
                            pointBorderColor={"#FF9F5A"}
                            lineWidth={6}
                            colors={Object.values(["#FF9F5A"])}
                            pointLabel="y"
                            pointLabelYOffset={-12}
                            useMesh={true}
                            legends={[]}
                        />
                    </div>
                </div>
            </div>
        );
    }

    handlePointClick(point) {
        this.props.history.push(
            `/${this.state.type.toLowerCase()}/${this.state.userID}/${
            point.data.x
            }`
        );
    }

    async requestData() {
        let lineChartData = [];

        if (!this.state.userID || !this.state.type) {
            return;
        }

        const data = await getHistory(this.state.userID, this.state.type);

        if (!data || !data[0] || !data[0].sections) {
            return;
        }

        const sections = Object.keys(data[0].sections);
        let sectionMap = {};
        let index = 0;
        for (let section of sections) {
            lineChartData.push([]);
            sectionMap[`${section}`] = index++;
        }

        lineChartData = this.createLineChartData(lineChartData, sectionMap, data);
        this.setState({
            chartData: lineChartData,
            loading: false,
        });
    }

    createLineChartData(lineChartData, sectionMap, data) {

        for (let section of Object.keys(sectionMap)) {
            const index = sectionMap[section];
            lineChartData[index] = [
                {
                    id: section,
                    data: new Array(data.length),
                    color: "#FF9F5A",
                },]
        }

        for (let datum of data) {
            for (let section of Object.keys(sectionMap)) {
                const index = sectionMap[section];
                lineChartData[index][0].data = {
                    x: datum.date,
                    y: datum.sections[section]
                }
            }
        }

        console.log(lineChartData);

        return lineChartData;
    }
}

export default HomePage;
