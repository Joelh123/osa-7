import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "",
	reducers: {
		changeNotification(state, action) {
			return action.payload;
		},
		clearNotification(state, action) {
			return null;
		},
	},
});

export const { changeNotification, clearNotification } =
	notificationSlice.actions;

export const setNotification = (content) => {
	return async (dispatch) => {
		dispatch(changeNotification(content));

		setTimeout(() => {
			dispatch(clearNotification());
		}, 5000);
	};
};

export default notificationSlice.reducer;
