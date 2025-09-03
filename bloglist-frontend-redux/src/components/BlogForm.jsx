import { useState } from "react";
import { setErrorMessage } from "../reducers/errorMessageReducer";
import { setNotification } from "../reducers/notificationReducer";
import { addBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const BlogForm = ({ blogFormRef }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const dispatch = useDispatch();

	const handleBlogCreation = (event) => {
		event.preventDefault();

		createBlog({
			title: title,
			author: author,
			url: url,
		});

		setTitle("");
		setAuthor("");
		setUrl("");
	};

	const createBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();

		dispatch(addBlog(blogObject));

		if (!(blogObject.title || blogObject.author || blogObject.url)) {
			return dispatch(setErrorMessage("Fill every field"));
		}

		dispatch(
			setNotification(
				`a new blog ${blogObject.title} by ${blogObject.author} added`
			)
		);
	};

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={handleBlogCreation}>
				<div>
					title:
					<input
						data-testid="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>
				</div>
				<div>
					author:
					<input
						data-testid="author"
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
					/>
				</div>
				<div>
					url:
					<input
						data-testid="url"
						value={url}
						onChange={(event) => setUrl(event.target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default BlogForm;
