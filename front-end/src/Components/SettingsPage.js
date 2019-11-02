import React, { Component } from "react";
import Header from "./Header";
import ColourSetting from "./ColourSetting";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "1324324",
		};
	}

	render() {
		return (
			<div>
				<Header title={"Settings"} nobutton={false} />
				<div className="Settings-card">
					<ColourSetting name="Graph Background" colour="#FFEBCC" />
					<ColourSetting name="Graph Line" colour="#FF9F5A" />
				</div>
			</div>
		);
	}

	handleClick(type) {
		this.props.history.push(`/${type.toLowerCase()}/${this.state.userID}`);
	}
}

export default HomePage;
