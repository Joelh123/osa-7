import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import errorMessageReducer from "./errorMessageReducer";
import blogReducer from "./blogReducer";

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		notification: notificationReducer,
		errorMessage: errorMessageReducer,
	},
});

export default store;
