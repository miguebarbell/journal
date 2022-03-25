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
			state.drafts.push(action.payload);
		},
		updateDraft: (state, action) => {
			state.drafts = state.drafts.filter(draft => draft.active === false);
			state.drafts.push(action.payload);
		},
		removeDraft: (state, action) => {
			state.drafts = state.drafts.splice(action.payload.index, 1);
		},
		setDraftActive: (state, action) => {
			state.drafts[action.payload].active = true;
		}
	}
});


export const {setActive, addDraft, updateDraft, removeDraft, setDraftActive} = entrySlice.actions;
export default entrySlice.reducer;
