import React, { Component } from "react";
import Header from "./Header";
import ColourSetting from "./ColourSetting";
import NumberSetting from "./NumberSetting";
import { GetValue, StoreValue } from "../Services/Cookies";

class HomePage extends Component {
	constructor(props) {
		super(props);

		let fontSize = GetValue("font-size");
		if (!fontSize) {
			fontSize = 20
		}

		this.state = {
			fontSize,
			userID: "1324324",
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
				</div>
			</div>
		);
	}

	handleClick(type) {
		this.props.history.push(`/${type.toLowerCase()}/${this.state.userID}`);
	}
}

export default HomePage;
