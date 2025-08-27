import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import errorMessageReducer from "./errorMessageReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		user: userReducer,
		notification: notificationReducer,
		errorMessage: errorMessageReducer,
	},
});

export default store;
