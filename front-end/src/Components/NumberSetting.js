import React, { Component } from "react";
import TextField from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

class NumberSetting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			changeSetting: this.props.changeSetting,
			value: this.props.value,
		};
	}

	// useStyles = makeStyles((theme) => ({
	// 	container: {
	// 		display: "flex",
	// 		flexWrap: "wrap",
	// 	},
	// 	textField: {
	// 		marginLeft: theme.spacing(1),
	// 		marginRight: theme.spacing(1),
	// 		width: 200,
	// 	},
	// }));

	render() {
		// const classes = this.useStyles();
		return (
			<div className="Colour-setting">
				<div className="setting-text">{this.props.name}</div>
				<div>
					<form>
						<input
							type="text"
							value={this.state.value}
							onSubmit={this.onSubmit}
						/>
					</form>
				</div>
			</div>
		);
	}

	onSubmit = (value) => {
		this.setState({
			value: parseInt(value),
		});
	};

	onChange = () => {};

	handleClick = (colour) => {
		this.setState({
			clicked: !this.state.clicked,
		});
	};

	handleClose = () => {
		// this.colour =
		this.setState({
			clicked: false,
		});
	};

	handleChangeComplete = (color, event) => {
		this.setState({ colour: "#" + color.hex });
	};

	handleChange = (color, event) => {
		this.setState({ colour: "#" + color.hex });
	};
}

export default NumberSetting;
