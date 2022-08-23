type LengthType = {
	title: string;
	changeTime: any;
	type: string;
	time: number | null;
	idTimer: string;
	idDecrease: string;
	idIncrease: string;
	idTimerValue: string;
	formatTime: (time: number | null) => any;
};

/**
 *  this Component take the title of the box
 *  the function changeTime who increase or decrease the time in the app components
 *  the type is -- decrease or increment
 *  formatTime help us to format time giving in minutes to seconds
 */
const Length = ({ title, changeTime, type, time, formatTime, idTimer, idDecrease, idIncrease, idTimerValue }: LengthType) => {
	return (
		<div>
			<h3>{title}</h3>
			<div className='times-sets' id={idTimer}>
				<button
					className='btn-small '
					onClick={() => changeTime(-60, type)}
					id={idDecrease}
				>
					-
				</button>
				<h3 id={idTimerValue}>{formatTime(time)}</h3>
				<button
					className='btn-small '
					onClick={() => changeTime(60, type)}
					id={idIncrease}
				>
					+
				</button>
			</div>
		</div>
	);
};

export default Length;
