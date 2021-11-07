import React from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

const Controls = (props) => {
	return (
		<div className="controls">
			<div id="start_stop" onClick={props.startStop}>
				<FontAwesomeIcon
					icon={props.isRunning ? faPauseCircle : faPlayCircle}
					size="lg"
				/>
			</div>

			<div id="reset" onClick={props.reset}>
				<FontAwesomeIcon icon={faSync} />
			</div>
		</div>
	);
};

export default Controls;
