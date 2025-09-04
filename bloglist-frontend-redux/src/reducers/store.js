import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import errorMessageReducer from "./errorMessageReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import commentReducer from "./commentReducer";

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		users: usersReducer,
		user: userReducer,
		notification: notificationReducer,
		errorMessage: errorMessageReducer,
		comments: commentReducer,
	},
});

export default store;
