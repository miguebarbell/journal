
import {publicRequest, userRequest} from "../requestMethods";
import {addGoal} from "./goalRedux";


export const addAGoal = async (dispatch, goal) => {
	try {
		const newGoal = await userRequest.post("api/goal/add/", goal);
		// const newGoal = await publicRequest.post("api/goal/add/", goal);
		dispatch(addGoal(newGoal));
		return newGoal;

	} catch (err) {
		console.log(err);
		return err;
	}
};

export const getGoals = async (dispatch) => {};

export const editgoals = async (dispatch, goals) => {
	try {
		const newGoals = await publicRequest.post("api/", goals);
	} catch (err) {

	}

};
