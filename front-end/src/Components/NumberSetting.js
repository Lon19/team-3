import React, { Component } from "react";
import TextField from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { GetValue, StoreValue } from "../Services/Cookies";

class NumberSetting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			changeSetting: this.props.changeSetting,
			value: this.props.value,
		};
	}

	render() {
		// const classes = this.useStyles();
		return (
			<div className="Colour-setting">
				<div className="setting-text">{this.props.name}</div>
				<div>
					<form onSubmit={(e) => this.handleSubmit(e)}>
						<input
							type="text"
							className="number-input"
							value={this.state.fontSize}
							onChange={(e) => this.handleChange(e)}
						/>
						<input
							type="submit"
							value="Submit"
							className="submit"
						/>
					</form>
				</div>
			</div>
		);
	}

	handleSubmit(event) {
		console.log(this.state.value);
		StoreValue("font-size", this.state.value);
		this.setState({ value: event.target.value });
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}
}

export default NumberSetting;
