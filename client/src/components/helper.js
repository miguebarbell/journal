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
