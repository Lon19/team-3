import React, { Component } from "react";
import HorizontalTimeline from "react-horizontal-timeline";

class TextPage extends Component {
	constructor(props) {
		super(props);

		this.state = { value: 0, previous: 0 };
	}

	VALUES = ["0", "1", "2"];

	render() {
		return (
			<div>
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
				<div className="TextPage-main-container">
					<div className="TextPage-main">questionnaire goes here</div>
				</div>
			</div>
		);
	}
}

export default TextPage;
