import { useState } from 'react';
import './App.css';

import Length from './components/Length';

function App() {
	const [displayTime, setDisplayTime] = useState(25 * 60);
	const [breakTime, setBreakTime] = useState(5 * 60);
	const [sessionTime, setSessionTime] = useState(25 * 60);
	const [timeOn, setTimeOn] = useState(false);
	const [onBreak, setOnBreak] = useState(false);
	//to manage our  audio file
	const [breakAudio, setBreakAudio] = useState(
		new Audio('./BEEP - SOUND EFFECT.mp3')
	);

	const playBreakSound = () => {
		breakAudio.currentTime = 0;
		breakAudio.play();
	};

	const formatTime = (time: any) => {
		let minutes: number = Math.floor(time / 60);
		let seconds: number = time % 60;

		return (
			[minutes < 10 ? '0' + minutes : minutes] +
			':' +
			[seconds < 10 ? '0' + seconds : seconds]
		);
	};

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
					title={'break length'}
					changeTime={changeTime}
					type='break'
					time={breakTime}
					formatTime={formatTime}
				/>
				<Length
					title={'session length'}
					changeTime={changeTime}
					type='session'
					time={sessionTime}
					formatTime={formatTime}
				/>
			</div>

			<h3>{onBreak ? 'onBreak' : 'session'}</h3>
			<h1>{formatTime(displayTime)}</h1>
			<button onClick={controlTimer}>{timeOn ? 'pause' : 'play'}</button>
			<button onClick={resetTimer}>reset</button>
		</div>
	);
}

export default App;
