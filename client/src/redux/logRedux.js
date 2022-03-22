import {createSlice} from "@reduxjs/toolkit";

const entrySlice = createSlice({
	name: "entry",
	initialState: {
		active: false
	},
	reducers: {
		setActive: (state) => {
			state.active = !state.active;
		}
	}
});


export const {setActive} = entrySlice.actions;
export default entrySlice.reducer;
