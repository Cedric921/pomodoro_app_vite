import { useState } from 'react';
import './App.css';

import Length from './components/Length';

function App() {
	const timerLenght = {
		session: 25,
		break: 5,
		second: 60,
	};
	// this state will contain the time who will be decrease
	const [displayTime, setDisplayTime] = useState(
		timerLenght.session * timerLenght.second
	);
	// this state will contain the value of the break time in seconds
	const [breakTime, setBreakTime] = useState(
		timerLenght.break * timerLenght.second
	);
	// this state will contain the value of the session time in seconds
	const [sessionTime, setSessionTime] = useState(
		timerLenght.session * timerLenght.second
	);
	// this state will help us to know if timer is running or not
	const [timeOn, setTimeOn] = useState(false);
	// this state will help us to know if timer is running in break value
	const [onBreak, setOnBreak] = useState(false);
	//to manage our  audio file
	const [breakAudio, setBreakAudio] = useState(
		new Audio('./BEEP - SOUND EFFECT.mp3')
	);

	//to play the sound when time is over
	const playBreakSound = () => {
		breakAudio.currentTime = 0;
		breakAudio.play();
	};

	/**
	 *
	 * @param time number
	 * @returns  string
	 * it will format time for seconds in minutes and seconds
	 */
	const formatTime = (time: any) => {
		let minutes: number = Math.floor(time / 60);
		let seconds: number = time % 60;

		return (
			[minutes < 10 ? '0' + minutes : minutes] +
			':' +
			[seconds < 10 ? '0' + seconds : seconds]
		);
	};
	/**
	 * @param {number} amount The value of the time
	 * @param {number} type the type of change -- increase or --decrease The value of the
	 * will change the current value of time
	 */
	const changeTime = (amount: any, type: string) => {
		if (type == 'break') {
			if (amount <= 0 && breakTime <= 60) return;
			setBreakTime((prev) => prev + amount);
		} else {
			if (amount <= 0 && sessionTime <= 60) return;
			setSessionTime((prev) => prev + amount);
			if (!timeOn) {
				setDisplayTime(sessionTime + amount);
			}
		}
	};

	const controlTimer = () => {
		let second: number = 1000;
		let date: number = new Date().getTime();
		let nextDate: number = new Date().getTime() + second;
		let onBreakVariable: boolean = onBreak;
		if (!timeOn) {
			//loop to decrease the displayTime
			let interval = setInterval(() => {
				date = new Date().getTime();
				if (date > nextDate) {
					setDisplayTime((prev) => {
						//we check if our time is now not to zero
						if (prev <= 1 && !onBreakVariable) {
							// we make a sound
							playBreakSound();
							//we say, we going in break time
							setOnBreak(true);
							//we signal that we are going in break time (5)
							onBreakVariable = true;
							//
							return breakTime;
						} else if (prev <= 1 && onBreakVariable) {
							// we make a sound
							playBreakSound();
							//we signal that we are in
							onBreakVariable = false;
							//we say, we going in session time
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					});
					nextDate += second;
				}
			}, 30);
			localStorage.clear();
			localStorage.setItem('intervalId', interval.toString());
		} else {
			//make a pause play button
			clearInterval(parseInt(localStorage.getItem('intervalId')!));
		}

		setTimeOn(!timeOn);
	};

	const resetTimer = () => {
		setDisplayTime(25 * 60);
		setBreakTime(5 * 60);
		setSessionTime(25 * 60);
	};

	return (
		<div className='App'>
			<div className='d-flex'>
				<Length
					idIncrease='break-increment'
					idDecrease='break-decrement'
					idTimer='break-label'
					idTimerValue='break-length'
					title={'break length'}
					changeTime={changeTime}
					type='break'
					time={breakTime}
					formatTime={formatTime}
				/>
				<Length
					idIncrease='session-increment'
					idDecrease='session-decrement'
					idTimer='session-label'
					idTimerValue='session-length'
					title={'session length'}
					changeTime={changeTime}
					type='session'
					time={sessionTime}
					formatTime={formatTime}
				/>
			</div>

			<h3 id='timer-label'>{onBreak ? 'onBreak' : 'session'}</h3>
			<h1 id='time-left'>{formatTime(displayTime)}</h1>
			<button onClick={controlTimer} id='start_stop'>
				{timeOn ? 'pause' : 'play'}
			</button>
			<button onClick={resetTimer} id='reset'>
				reset
			</button>
			<audio
				id='beep'
				preload='auto'
				src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
			/>
		</div>
	);
}

export default App;
