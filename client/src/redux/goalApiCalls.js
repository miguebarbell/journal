import {userRequest} from "../requestMethods";
import {addGoal, deleteGoal, editGoal} from "./goalRedux";
import {REACT_APP_DEMO_EMAIL} from "../conf";


export const addAGoal = async (dispatch, goal) => {
	// TODO: skip request if demouser, check the correct response fomr the server to send back to redux correctly.
	try {
		let newGoal;
		if (goal.user !== REACT_APP_DEMO_EMAIL) {
			newGoal = await userRequest().post("api/goal/add/", goal);
			dispatch(addGoal(newGoal));
		} else {
			newGoal = goal;
			const date = new Date();
			date.setHours(0, 0, 0, 0);
			date.setDate(newGoal.start.split("-")[2]);
			date.setMonth(newGoal.start.split("-")[1] - 1);
			date.setFullYear(newGoal.start.split("-")[0]);
			newGoal.start = + date;
			newGoal.timeFrame = parseInt(newGoal.timeFrame);
			newGoal._id = Math.floor(Math.random() * 10000);
			dispatch(addGoal({data:newGoal}));
		}
		// const newGoal = await publicRequest.post("api/goal/add/", goal);
		console.log(newGoal);
		return newGoal;

	} catch (err) {
		console.log(err);
		return err;
	}
};

export const editThisGoal = async (dispatch, goal) => {
	try {
		// const editedGoal = await publicRequest.put("api/goal/", goal);
		let editedGoal;
		if (goal.user !== REACT_APP_DEMO_EMAIL) {
			 editedGoal = await userRequest().put("api/goal/", goal);
			dispatch(editGoal(editedGoal.data))
		} else {
			editedGoal = goal;
			if (typeof goal.start === "string") {
				editedGoal.start = +Date.parse(goal.start);
			} else {
				editedGoal.start = new Date(goal.start).getTime();
			}
			editedGoal.timeFrame = parseInt(goal.timeFrame);
			dispatch(editGoal(editedGoal));
		}
		return editedGoal;
	} catch (err) {
		return err
	}
};

export const deleteThisGoal = async (dispatch, goal) => {
	try {
		let goalToDelete;
		if (goal.user !== REACT_APP_DEMO_EMAIL) {
			goalToDelete = await userRequest().post("api/goal/delete", goal);
			dispatch(deleteGoal(goalToDelete.data))
		} else {
			goalToDelete = goal;
			dispatch(deleteGoal(goalToDelete));
		}
		return goalToDelete;
	} catch (err) {
		return err;
	}
}
