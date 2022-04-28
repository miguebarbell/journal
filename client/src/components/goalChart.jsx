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

const Container = styled.div``
const GoalChart = ({goal}) => {
	const logsData = useSelector(state => state.training.logs)
		.filter(log => log.movement === goal.movement)
		.sort((a, b) => {
			if (new Date(a.date) >= new Date(b.date)) return 1;
			else return -1;
		})


	const options = {
		responsive: true,
		plugins: {
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
			if (i === 0) {
				// 0 must be the initial goal date in the timeframe
				arrayOfDays.push(`${stringMonths[firstDay.getMonth()]} ${firstDay.getDate()}`)
				workingMonth = firstDay.getMonth()
			}
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
		const arrayOfAcummulatedVolume = [];
		const arrayOfMaxRelInt = [];
		const arrayOfMaxAbsInt = [];
		const firstDay = new Date(goal.start);
		let accumulationForDay = {
			date: firstDay,
			value: 0,
			relInt: 0,
			absInt: 0
		};
		for (let i = 0; i < logsData.length; i++) {
			const workingDay = new Date(logsData[i].date);
			// no training the first day => push 0
			if (i === 0 && firstDay.toDateString() !== workingDay.toDateString()) {
				arrayOfAcummulatedStrain.push(accumulationForDay.value);
				arrayOfAcummulatedVolume.push(accumulationForDay.value);
				arrayOfMaxRelInt.push(accumulationForDay.relInt);
				arrayOfMaxAbsInt.push(accumulationForDay.absInt);
			}
			if (workingDay.toDateString() === accumulationForDay.date.toDateString()) {
				accumulationForDay.value += logsData[i].strain * logsData[i].sets * logsData[i].reps
				if (logsData.length === 1) arrayOfAcummulatedStrain.push(accumulationForDay.value)
				if (accumulationForDay.relInt < epleyFormula(logsData[i].strain, logsData[i].reps)) accumulationForDay.relInt = epleyFormula(logsData[i].strain, logsData[i].reps)
				if (accumulationForDay.absInt < logsData[i].strain) accumulationForDay.absInt = logsData[i].strain
				continue
			} else {
				accumulationForDay.date = workingDay
				accumulationForDay.value = logsData[i].strain * logsData[i].sets * logsData[i].reps
				accumulationForDay.relInt = epleyFormula(logsData[i].strain, logsData[i].reps)
				accumulationForDay.absInt = logsData[i].strain
			}
			arrayOfAcummulatedStrain.push(accumulationForDay.value)
			arrayOfAcummulatedVolume.push(accumulationForDay.value + arrayOfAcummulatedVolume[arrayOfAcummulatedVolume.length - 1])
			arrayOfMaxRelInt.push(accumulationForDay.relInt)
			arrayOfMaxAbsInt.push(accumulationForDay.absInt)
		}
		return {
			dailyVol: arrayOfAcummulatedStrain,
			accVol: arrayOfAcummulatedVolume,
			dailyRelInt: arrayOfMaxRelInt,
			dailyAbsInt: arrayOfMaxAbsInt
		};
	}
	let data = {}
	const labels = allDays();
	const logStats = accumulationForDay();
	if (goal.plan === "accu") {
		data = {
			labels,
			datasets: [
				{
					label: 'Volume per day',
					data: logStats.dailyVol,
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
					borderColor: 'rgb(53, 162, 235)',
				},
				{
					label: 'Accumulated',
					data: logStats.accVol,
					backgroundColor: 'rgba(53, 62, 235, 0.5)',
					borderColor: 'rgb(53, 62, 235)',
				},
				{
					label: 'Goal',
					data: logStats.dailyVol.map(() => goal.quantity),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
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
					data: logStats.dailyAbsInt,
					backgroundColor: 'rgba(53, 62, 235, 0.5)',
					borderColor: 'rgb(53, 62, 235)',
				},
				{
					label: 'Max Rel Int / day',
					data: logStats.dailyRelInt,
					backgroundColor: 'rgba(53, 162, 235, 0.5)',
					borderColor: 'rgb(53, 162, 235)',
				},
				{
					label: 'Goal',
					data: logStats.dailyVol.map(() => goal.quantity),
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					borderColor: 'rgb(255, 99, 132)',
				},
			],
		};
	}

	return (
		<Container>
			<Line
				type='line'
				data={data}
				options={options}
			/>
		</Container>
	)
}

export default GoalChart
