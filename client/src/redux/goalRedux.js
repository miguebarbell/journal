import {createSlice} from "@reduxjs/toolkit";

const goalSlice = createSlice({
	name: "training",
	initialState: {
		goals: [],
		logs: [],
		showing: false
	},
	reducers: {
		setGoals: (state, action) => {
			// must be set at login, and updated
			state.goals = action.payload;
		},
		addGoal: (state, action) => {
			state.goals.push(action.payload.data);
		},
		editGoal: (state, action) => {
			// update in place
			state.goals[state.goals.findIndex(goal => goal.movement === action.payload.movement)] = action.payload;
		},
		setLogs: (state, action) => {
			state.logs = action.payload;
		},
		addLog: (state, action) => {
			state.logs.push(action.payload);
		},
		editLog: (state, action) => {
			state.showing = action.payload;
		},
		saveEdittedLog: (state, action) => {
			const newLogs = state.logs.filter(log => log._id !== action.payload._id);
			newLogs.push(action.payload);
			state.logs = newLogs;
		},
		deleteActiveLog: (state) => {
			state.logs = state.logs.filter(log => log._id !== state.showing._id);
			state.showing = false;
		}
	}
});

export const {setGoals, addGoal, setLogs, addLog, editLog, saveEdittedLog, deleteActiveLog, editGoal} = goalSlice.actions;
export default goalSlice.reducer;
