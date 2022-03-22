import {createSlice} from "@reduxjs/toolkit";

const entrySlice = createSlice({
	name: "entry",
	initialState: {
		active: false,
		drafts: [],
	},
	reducers: {
		setActive: (state) => {
			state.active = !state.active;
		},
		addDraft: (state, action) => {
			state.drafts.push(action.payload.data);
		}
	}
});


export const {setActive, addDraft} = entrySlice.actions;
export default entrySlice.reducer;
