import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import errorMessageReducer from "./errorMessageReducer";

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		errorMessage: errorMessageReducer,
	},
});

export default store;
