import React, { Component } from "react";

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
	}

	render() {
		return (
			<div className="header">
				{(!this.props.nobutton) ? (<button
					className="header-button"
					onClick={() => this.handleClick()}
				>
					Back
				</button>) : undefined}

				<div className="page-title">{this.props.title}</div>
			</div>
		);
	}

	handleClick() {
		window.history.back();
	}
}

export default Header;
