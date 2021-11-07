import React from 'react';
import './App.scss';

const Session = (props) => {
	return (
		<div className="sesh-ctrls">
			<h3 id="session-label">Session Length</h3>
			<div className="session">
				<button
					id="session-decrement"
					type="button"
					value="-"
					onClick={props.sessionDecrement}
				>
					-
				</button>
				<div id="session-length">{props.length}</div>
				<button
					id="session-increment"
					type="button"
					value="+"
					onClick={props.sessionIncrement}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default Session;
