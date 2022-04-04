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



// formulas for calculate the 1RM or relative intensity for the set, it returns a rounded value
// eplayFormula for < 5RM, else brzyckiFormula
export const epleyFormula = (strain, reps) => {
	if (reps <= 1) return strain;
	return Math.round(strain * (1 + (reps/30)));
};

export const brzyckiFormula = (strain, reps) => {
	return Math.round(strain * (36 / (37 - reps)));
};

export const accumulatedDistanceFormula = (strain, sets, reps) => {
	return strain * reps * sets;
};
