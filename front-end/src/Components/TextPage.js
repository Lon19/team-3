import React, { Component } from "react";
import HorizontalTimeline from "react-horizontal-timeline";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = { value: 0, previous: 0 };
	}

	VALUES = ["0/2/23", "1/2/32", "2/3/42"];

	render() {
		return (
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
		);
	}
}

export default TextPage;
