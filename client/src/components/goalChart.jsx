import styled from "styled-components"
import {useSelector} from "react-redux";
import {Line} from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import {epleyFormula} from "./helper";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Container = styled.div`
	display: ${({show}) => show ? 'block' : 'none'};
  transition: all .2s ease-out;
`
const GoalChart = ({goal, show}) => {
	const logsData = useSelector(state => state.training.logs)
		.filter(log => log.movement === goal.movement)
		.sort((a, b) => {
			if (new Date(a.date) >= new Date(b.date)) return 1;
			else return -1;
		})
	const options = {
		responsive: true,
		plugins: {
			// filler: {
			// 	propagate: true
			// },
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: goal.plan,
			},
		},
	};

	// const stringDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const stringMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const allDays = () => {
		const arrayOfDays = [];
		let workingMonth = 0;
		for (let i = 0; i < logsData.length; i++) {
			const firstDay = new Date(goal.start);
			// should check every month change
			// first day must be string indicating the day and month iex: May 20
			// if (i === 0) {
			// 	// 0 must be the initial goal date in the timeframe
			// 	arrayOfDays.push(`${stringMonths[firstDay.getMonth()]} ${firstDay.getDate()}`)
			// 	workingMonth = firstDay.getMonth()
			// }
			// check the month change
			const workingDay = new Date(logsData[i].date);
			if (workingDay.getMonth() !== workingMonth) {
				arrayOfDays.push(`${stringMonths[workingDay.getMonth()]} ${workingDay.getDate()}`)
				workingMonth = workingDay.getMonth()
			} else {
				// check if this is the first day
				if (workingDay.toDateString() === firstDay.toDateString()) continue;
				// check if the last have the same day
				if (`${workingDay.getDate()}` === arrayOfDays[arrayOfDays.length - 1]) continue;
				arrayOfDays.push(`${workingDay.getDate()}`)
			}
		}
		return arrayOfDays;
	}
	const accumulationForDay = () => {
		const arrayOfAcummulatedStrain = [];
		const arrayOfMaxRelInt = [];
		const arrayOfMaxAbsInt = [];
		const arrayOfTimes = [];
		const arrayOfRange = [];
		const firstDay = new Date(goal.start);
		let accumulationForDay = {
			date: firstDay,
			value: 0,
			relInt: 0,
			absInt: 0,
			times: 0,
			inRange: false
		};
		function isInRange(date) {
			const firstDate = new Date(goal.start)
			const lastDate = new Date(goal.start)
			lastDate.setDate(lastDate.getDate() + goal.timeFrame)
			return (date.getTime() <= lastDate.getTime() && date.getTime() >= firstDate.getTime())
		}
		for (let i = 0; i < logsData.length; i++) {
			const workingDay = new Date(logsData[i].date);
			if (workingDay.toDateString() === accumulationForDay.date.toDateString()) {
				accumulationForDay.value += logsData[i].strain * logsData[i].sets * logsData[i].reps
				// if (logsData.length === 1) arrayOfAcummulatedStrain.push(accumulationForDay.value)
				if (accumulationForDay.relInt < epleyFormula(logsData[i].strain, logsData[i].reps)) accumulationForDay.relInt = epleyFormula(logsData[i].strain, logsData[i].reps)
				if (accumulationForDay.absInt < logsData[i].strain) accumulationForDay.absInt = logsData[i].strain
				accumulationForDay.times += logsData[i].sets * logsData[i].reps
				accumulationForDay.inRange = isInRange(workingDay);
				if (logsData.length !== 1) continue
				// continue
			} else {
				accumulationForDay.date = workingDay;
				accumulationForDay.inRange = isInRange(workingDay);
				accumulationForDay.value = logsData[i].strain * logsData[i].sets * logsData[i].reps;
				accumulationForDay.relInt = epleyFormula(logsData[i].strain, logsData[i].reps);
				accumulationForDay.absInt = logsData[i].strain;
				accumulationForDay.times = logsData[i].sets * logsData[i].reps;
			}
			arrayOfAcummulatedStrain.push(accumulationForDay.value)
			arrayOfMaxRelInt.push(accumulationForDay.relInt)
			arrayOfMaxAbsInt.push(accumulationForDay.absInt)
			arrayOfTimes.push(accumulationForDay.times)
			arrayOfRange.push(accumulationForDay.inRange)
		}
		const arrayOfAcummulatedVolume = () => {
			const arrayForReturn = [];
			for ( let i = 0; i < arrayOfAcummulatedStrain.length;i++){
				if (i === 0) {
					arrayForReturn.push(arrayOfAcummulatedStrain[i]);
				} else {
					arrayForReturn.push(arrayOfAcummulatedStrain[i] + arrayForReturn[arrayForReturn.length - 1]);
				}
			}
			return arrayForReturn;
		}
		return {
			dailyVol: arrayOfAcummulatedStrain,
			accVol: arrayOfAcummulatedVolume(),
			dailyRelInt: arrayOfMaxRelInt,
			dailyAbsInt: arrayOfMaxAbsInt,
			dailyTimes: arrayOfTimes,
			inRange: arrayOfRange
		};
	}
	let data = {}
	let labels = allDays();
	const logStats = accumulationForDay();
	// trim the labels
	labels = labels.filter((el, index) => (logStats.inRange[index]))
	// console.log(labels)
	if (goal.plan === "accu") {
		data = {
			labels,
			datasets: [
				{
					label: 'Volume per day',
					data: logStats.dailyVol.filter((log, index) => logStats.inRange[index]),
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
					borderColor: 'rgb(53, 162, 235)',
					tension: 0.3,
					pointRadius: 2,
				},
				{
					label: 'Accumulated',
					data: logStats.accVol.filter((log, index) => logStats.inRange[index]),
					backgroundColor: 'rgba(53, 62, 235, 0.5)',
					borderColor: 'rgb(53, 62, 235)',
					tension: 0.3,
					pointRadius: 2,
				},
				{
					label: 'Goal',
					data: logStats.dailyVol.map(() => goal.quantity),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
					fill: {
						target: "origin",
						above: 'rgba(0, 200, 0, 0.5)',   // Area will be red above the origin
						below: 'rgb(0, 0, 255)'
					},
					pointRadius: logStats.dailyVol.length === 1 ? 2 : 0,
					pointHoverRadius: 0,
					borderWidth: 1
				},
			],
		};
	}
	else if (goal.plan === "test") {
		data = {
			labels,
			datasets: [
				{
					label: 'Max Abs Int / day',
					data: logStats.dailyAbsInt.filter((log, index) => logStats.inRange[index]),
					backgroundColor: 'rgba(53, 62, 235, 0.5)',
					borderColor: 'rgb(53, 62, 235)',
					tension: 0.3,
					pointRadius: 2,
				},
				{
					label: 'Max Rel Int / day',
					data: logStats.dailyRelInt.filter((log, index) => logStats.inRange[index]),
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
					borderColor: 'rgb(53, 162, 235)',
					tension: 0.2,
					pointRadius: 2
				},
				{
					label: 'Goal',
					data: logStats.dailyVol.map(() => goal.quantity),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
					pointRadius: logStats.dailyVol.length === 1 ? 2 : 0,
					fill: true,
					pointHoverRadius: 0,
					borderWidth: 1
				},
			],

			backgroundColor: ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)']
		};
	}
	else if (goal.plan === "habit") {
		data = {
			labels,
			datasets: [
				{
					label: 'Times / day',
					data: logStats.dailyTimes.filter((log, index) => logStats.inRange[index]),
					backgroundColor: 'rgba(53, 62, 235, 0.5)',
					borderColor: 'rgb(53, 62, 235)',
					order: 1
				},
				{
					label: 'Goal',
					data: logStats.dailyVol.map(() => goal.quantity),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
					pointRadius: logStats.dailyVol.length === 1 ? 2 : 0,
					pointHoverRadius: 0,
					order: 2,
					borderWidth: 1
				},
			],
		};
	}

	return (
		<Container show={(goal.movement === show)}>
			{logStats.inRange.find(el => el === true) === true ?
				<Line
				// type='line'
				data={data}
				options={options}
			  />
			: <h3 style={{textAlign: 'center'}}>Add a Log to start seeing your stats!</h3>}
		</Container>
	)
}

export default GoalChart
