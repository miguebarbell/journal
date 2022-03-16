import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: false,
		error: false,
		isFetching: false
	},
	reducers: {
		loginStart: (state) => {
			state.isFetching = true;
		},
		loginSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.isFetching = false;
			state.error = false;
		},
		loginFailure: (state) => {
			state.error = true;
			state.isFetching = false;
		},
		logOut: (state) => {
			state.currentUser = false;
			state.error = false;
		},
		resetLogin: (state) => {
			state.error = false;
		},
	}
});

export const { loginSuccess, loginFailure, logOut, loginStart, resetLogin} = userSlice.actions;
export default userSlice.reducer;
