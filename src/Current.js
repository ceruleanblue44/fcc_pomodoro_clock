import React from 'react';
import './App.scss';

const Current = (props) => {
	return (
		<div className="current-sesh">
			<div className="current">
				<h3 id="timer-label">Current: {props.intID}</h3>
				<p>Time remaining: </p>
				<div id="time-left">{props.convertToTime}</div>
			</div>
		</div>
	);
};

export default Current;
