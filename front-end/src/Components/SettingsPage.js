import React, { Component } from "react";
import Header from "./Header";
import ColourSetting from "./ColourSetting";
import NumberSetting from "./NumberSetting";
import { GetValue } from "../Services/Cookies";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userID: "1324324",
			fontSize: GetValue("font-size"),
		};
	}

	render() {
		return (
			<div>
				<Header title={"Settings"} nobutton={false} />
				<div className="Settings-card">
					<NumberSetting
						name="Font Size"
						value={this.state.fontSize}
						min={1}
						max={100}
					/>
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
