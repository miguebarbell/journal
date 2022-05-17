import {userRequest} from "../requestMethods";
import {addGoal, deleteGoal, editGoal} from "./goalRedux";


export const addAGoal = async (dispatch, goal) => {
	try {
		const newGoal = await userRequest().post("api/goal/add/", goal);
		// const newGoal = await publicRequest.post("api/goal/add/", goal);
		dispatch(addGoal(newGoal));
		return newGoal;

	} catch (err) {
		console.log(err);
		return err;
	}
};

export const editThisGoal = async (dispatch, goal) => {
	try {
		// const editedGoal = await publicRequest.put("api/goal/", goal);
		const editedGoal = await userRequest().put("api/goal/", goal);
		dispatch(editGoal(editedGoal.data))
		return editedGoal;
	} catch (err) {
		return err
	}
};

export const deleteThisGoal = async (dispatch, goal) => {
	try {
		const goalToDelete = await userRequest().post("api/goal/delete", goal);
		dispatch(deleteGoal(goalToDelete.data))
		return goalToDelete;
	} catch (err) {
		return err;
	}
}
