import {createSlice} from "@reduxjs/toolkit";

const goalSlice = createSlice({
	name: "training",
	initialState: {
		goals: []
	},
	reducers: {
		setGoals: (state, action) => {
			// must be set at login, and updated
			state.goals = action.payload;
		},
		addGoal: (state, action) => {
			state.goals.push(action.payload.data);
		},
	}
});

export const {setGoals, addGoal} = goalSlice.actions;
export default goalSlice.reducer;
