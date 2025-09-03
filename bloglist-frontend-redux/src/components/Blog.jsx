import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";

const Blog = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) => state.blogs);
	const id = useParams().id;
	const blog = blogs.find((b) => b.id === id);

	const updateBlog = (blog) => {
		dispatch(likeBlog(blog));
	};

	const removeBlog = (blogToRemove) => {
		if (
			window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		) {
			dispatch(deleteBlog(blogToRemove));

			dispatch(setNotification(`${blogToRemove.title} has been deleted`));
		} else {
			return null;
		}
	};

	if (!blog) {
		return null;
	}

	return (
		<>
			<h1>{blog.title}</h1>
			<div>
				<a href={blog.url}>{blog.url}</a>
			</div>
			<div data-testid="likes">
				{blog.likes} <button onClick={() => updateBlog(blog)}>like</button>
			</div>
			<div>{blog.user.name}</div>
			{user.username === blog.user.username ? (
				<button onClick={() => removeBlog(blog)}>remove</button>
			) : null}
		</>
	);
};

export default Blog;
