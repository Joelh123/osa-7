import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/commentReducer";

const CommentForm = ({ id }) => {
	const [content, setContent] = useState("");

	const dispatch = useDispatch();

	const handleCommentCreation = (event) => {
		dispatch(addComment(id, { content: content }));
	};

	return (
		<form onSubmit={handleCommentCreation}>
			<input
				value={content}
				onChange={(event) => setContent(event.target.value)}
			/>
			<button type="submit">add comment</button>
		</form>
	);
};

export default CommentForm;
