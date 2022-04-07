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
			console.log(action.payload);
			const newLogs = state.logs.filter(log => log._id !== action.payload._id);
			newLogs.push(action.payload);
			console.log(newLogs);
			state.logs = newLogs;
		}

	}
});

export const {setGoals, addGoal, setLogs, addLog, editLog} = goalSlice.actions;
export default goalSlice.reducer;
