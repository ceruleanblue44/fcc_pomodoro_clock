import React from 'react';
import './App.scss';

const Break = (props) => {
	return (
		<div>
			<div className="br-ctrls">
				<h3 id="break-label">Break Length</h3>
				<div className="break">
					<button
						id="break-decrement"
						type="button"
						value="-"
						onClick={props.breakDecrement}
					>
						-
					</button>
					<div id="break-length">{props.length}</div>
					<button
						id="break-increment"
						type="button"
						value="+"
						onClick={props.breakIncrement}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default Break;
