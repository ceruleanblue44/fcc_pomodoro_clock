import React from 'react';
import './App.scss';
import Break from './Break.js';
import Session from './Session.js';
import Current from './Current.js';
import Controls from './Controls.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			break: 5,
			session: 25,
			timeLeft: 1500,
			current: 'Session',
			isRunning: false,
		};
		this.audioRef = React.createRef();
		this.timer = undefined;
		this.breakIncrement = this.breakIncrement.bind(this);
		this.breakDecrement = this.breakDecrement.bind(this);
		this.sessionIncrement = this.sessionIncrement.bind(this);
		this.sessionDecrement = this.sessionDecrement.bind(this);
		this.countDown = this.countDown.bind(this);
		// It's green because it's an arrow function
		this.convertToMinSec = this.convertToMinSec.bind(this);
		this.handleRunPause = this.handleRunPause.bind(this);
		this.reset = this.reset.bind(this);
		this.handleBeep = this.handleBeep.bind(this);
	}

	breakIncrement() {
		this.setState((state) => ({
			break: state.break < 60 ? state.break + 1 : 60,
		}));
	}

	breakDecrement() {
		this.setState((state) => ({
			break: state.break >= 2 ? state.break - 1 : 1,
		}));
	}

	sessionIncrement() {
		const { current, session } = this.state;
		if (current === 'Session') {
			this.setState(() => ({
				session: session < 59 ? session + 1 : 60,
				timeLeft: (session < 59 ? session + 1 : 60) * 60,
			}));
		}
	}

	sessionDecrement() {
		const { current, session } = this.state;
		if (current === 'Session') {
			this.setState(() => ({
				session: session > 1 ? session - 1 : 1,
				timeLeft: (session > 1 ? session - 1 : 1) * 60,
			}));
		}
	}

	countDown() {
		let timeLeft = this.state.timeLeft - 1;
		this.setState(() => ({
			timeLeft: timeLeft,
		}));
		if (timeLeft < 0 && this.state.current === 'Session') {
			this.setState({
				timeLeft: this.state.break * 60,
				current: 'Break',
			});
			this.handleBeep();
		} else if (timeLeft < 0 && this.state.current === 'Break') {
			this.setState({
				timeLeft: this.state.session * 60,
				current: 'Session',
			});
			this.handleBeep();
		}
	}

	handleRunPause() {
		const { isRunning } = this.state;
		if (!isRunning) {
			this.timer = setInterval(this.countDown, 1000);
			this.setState(() => ({
				isRunning: true,
			}));
		} else {
			this.timer = clearInterval(this.timer);
			this.setState(() => ({
				isRunning: false,
			}));
		}
	}

	convertToMinSec = (num) => {
		let min = Math.floor(num / 60);
		let sec = num % 60;
		sec = sec < 10 ? '0' + sec : sec;
		min = min < 10 ? '0' + min : min;
		return `${min}:${sec}`;
	};

	reset() {
		this.setState({
			break: 5,
			session: 25,
			current: 'Session',
			timeLeft: 1500,
			isRunning: false,
		});
		clearInterval(this.timer);
		this.audioRef.current.pause();
		this.audioRef.current.currentTime = 0;
	}

	handleBeep() {
		this.audioRef.current.play();
	}

	render() {
		const { timeLeft } = this.state;
		return (
			<div className="pomodoro-container">
				<h2> ~ Pomodoro Clock ~ </h2>
				<div className="length-ctrls">
					<Break
						length={this.state.break}
						breakDecrement={this.breakDecrement}
						breakIncrement={this.breakIncrement}
					/>
					<Session
						length={this.state.session}
						sessionDecrement={this.sessionDecrement}
						sessionIncrement={this.sessionIncrement}
					/>
				</div>
				<Current
					intID={this.state.current}
					convertToTime={this.convertToMinSec(timeLeft)}
				/>
				<Controls
					isRunning={this.state.isRunning}
					startStop={this.handleRunPause}
					reset={this.reset}
				/>
				<audio
					id="beep"
					preload="auto"
					ref={this.audioRef}
					src="http://www.ntcinc.com/ntc_vendors/audio_TOA_files/content/downloads/SAMPLES/4_tone_chime_down.wav"
				/>
			</div>
		);
	}
}
