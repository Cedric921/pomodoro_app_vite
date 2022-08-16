
type LengthType = {
	title: string;
	changeTime: any;
	type: string;
	time: number | null;
	formatTime: (time: number | null) => any;
};

const Length = ({ title, changeTime, type, time, formatTime }: LengthType) => {
	return (
		<div>
			<h3>{title}</h3>
			<div className='times-sets'>
				<button className='btn-small ' onClick={() => changeTime(-60, type)}>
					-
				</button>
				<h3>{formatTime(time)}</h3>
				<button className='btn-small ' onClick={() => changeTime(60, type)} >
					+
				</button>
			</div>
		</div>
	);
};

export default Length;
