import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";

const commentSlice = createSlice({
	name: "comments",
	initialState: [],
	reducers: {
		setComments(state, action) {
			return action.payload;
		},
		clearComments(state, action) {
			return null;
		},
	},
});

export const { setComments, clearComments } = commentSlice.actions;

export const initializeComments = (id) => {
	return async (dispatch) => {
		const comments = await commentService.getAll(id);
		dispatch(setComments(comments));
	};
};

export const addComment = (id, newComment) => {
	return async (dispatch) => {
		const updatedComments = await commentService.create(id, newComment);
		dispatch(setComments(updatedComments));
	};
};

export default commentSlice.reducer;
