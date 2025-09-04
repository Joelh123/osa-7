import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate, useParams } from "react-router-dom";
import { initializeComments } from "../reducers/commentReducer";
import NavBar from "./NavBar";
import { useEffect } from "react";
import CommentForm from "./CommentForm";

const Blog = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) => state.blogs);
	const comments = useSelector((state) => state.comments);
	const id = useParams().id;
	const blog = blogs.find((b) => b.id === id);

	console.log(comments);

	useEffect(() => {
		dispatch(initializeComments(id));
	}, [dispatch]);

	const updateBlog = (blog) => {
		dispatch(likeBlog(blog));
	};

	const removeBlog = (blogToRemove) => {
		if (
			window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		) {
			dispatch(deleteBlog(blogToRemove));
			dispatch(setNotification(`${blogToRemove.title} has been deleted`));
			navigate("/blogs");
		} else {
			return null;
		}
	};

	if (!blog) {
		return null;
	}

	return (
		<div className="container">
			<NavBar />
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
			<p>
				<b>comments</b>
			</p>
			<CommentForm id={id} />
			<ul>
				{comments.map((c) => (
					<li key={c.id}>{c.content}</li>
				))}
			</ul>
		</div>
	);
};

export default Blog;
