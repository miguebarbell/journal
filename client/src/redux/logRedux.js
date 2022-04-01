import {createSlice} from "@reduxjs/toolkit";

const entrySlice = createSlice({
	name: "entry",
	initialState: {
		active: false,
		drafts: [],
		day: false
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
		},
		clearDrafts: (state) => {
			// this should be done once a while
			state.drafts = [];
		},
		clearActiveDrafts: (state) => {
			state.drafts = state.drafts.filter(draft => draft.active === false);
		},
		setActiveDay: (state, action) => {
			state.day = action.payload;
		}

	}
});


export const {setActive, addDraft, updateDraft, removeDraft, setDraftActive, clearActiveDrafts, setActiveDay} = entrySlice.actions;
export default entrySlice.reducer;
