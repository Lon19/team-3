import React, { Component } from "react";

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<button>Mental Health</button>
				<button>Adjustments</button>
				<button>Work Self Confidence</button>
				<button>Organisational Culture</button>
			</div>
		);
	}
}

export default HomePage;
