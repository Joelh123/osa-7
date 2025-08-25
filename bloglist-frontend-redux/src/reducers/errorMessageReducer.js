import { createSlice } from "@reduxjs/toolkit";

const errorMessageSlice = createSlice({
	name: "error-message",
	initialState: "",
	reducers: {
		changeErrorMessage(state, action) {
			return action.payload;
		},
		clearErrorMessage(state, action) {
			return null;
		},
	},
});

export const { changeErrorMessage, clearErrorMessage } =
	errorMessageSlice.actions;

export const setErrorMessage = (content) => {
	return async (dispatch) => {
		dispatch(changeErrorMessage(content));

		setTimeout(() => {
			dispatch(clearErrorMessage());
		}, 5000);
	};
};

export default errorMessageSlice.reducer;
