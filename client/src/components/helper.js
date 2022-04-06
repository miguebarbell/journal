export const checkDays = (date1, date2) => {
	// check if two string dates are the same day return boolean
	const firstDate = new Date(date1);
	const secondDate = new Date(date2);
	return (
		firstDate.getDate() === secondDate.getDate()
		&& firstDate.getMonth() === secondDate.getMonth()
		&& firstDate.getFullYear() === secondDate.getFullYear()
	);
};


export const goalExpiration = (date, timeFrame) => {
	// date: Date, timeFrame: int
	// return the days left from today

	const today = new Date();
	let lastDay = new Date(date);
	lastDay.setDate(lastDay.getDate() + timeFrame);
	return {daysLeft: Math.floor((lastDay.getTime() - today.getTime())/(1000 * 3600 * 24)), expiration: lastDay};
};

export const prettierDate = (date) => {
	// date: string
	const humanReadable = new Date(date);
	return `${humanReadable.getFullYear()}/${humanReadable.getMonth() + 1}/${humanReadable.getDate()}`;
};

// formulas for calculate the 1RM or relative intensity for the set, it returns a rounded value
// eplayFormula for < 5RM, else brzyckiFormula
export const epleyFormula = (strain, reps) => {
	if (reps <= 1) return strain;
	return Math.round(strain * (1 + (reps / 30)));
};

export const brzyckiFormula = (strain, reps) => {
	return Math.round(strain * (36 / (37 - reps)));
};

export const accumulatedDistanceFormula = (strain, sets, reps) => {
	return strain * reps * sets;
};
