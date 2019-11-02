import React, { Component } from "react";
import { SwatchesPicker } from "react-color";

class ColourSetting extends Component {
	constructor(props) {
		super(props);

		this.state = {
			changeSetting: this.props.changeSetting,
			name: this.props.name,
			colour: this.props.colour,
			clicked: false,
		};
	}

	render() {
		const popover = {
			position: "absolute",
			zIndex: "2",
		};
		const cover = {
			position: "fixed",
			top: "0px",
			right: "0px",
			bottom: "0px",
			left: "0px",
		};
		return (
			<div className="Colour-setting">
				<div className="setting-text">{this.props.name}</div>
				<div
					className="setting-colour-block"
					style={{ background: this.props.colour }}
					onClick={this.handleClick}
				/>
				{this.state.clicked ? (
					<div className="colour-picker" style={popover}>
						<div
							style={cover}
							onClick={this.handleClose}
							color={this.state.colour}
							handleChangeComplete={this.handleChangeComplete}
							handleChange={this.handleChange}
						/>
						<SwatchesPicker />
					</div>
				) : null}
			</div>
		);
	}

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

export default ColourSetting;
