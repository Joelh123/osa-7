import { useRef } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";
import ErrorMessage from "./ErrorMessage";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const BlogView = () => {
	const blogFormRef = useRef();

	const blogs = useSelector((state) => state.blogs);

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid black",
		borderWidth: 2,
		marginBottom: 5,
	};

	return (
		<div className="container">
			<NavBar />
			<Notification />
			<ErrorMessage />
			<Togglable buttonLabel={"new blog"} ref={blogFormRef}>
				<BlogForm blogFormRef={blogFormRef} />
			</Togglable>
			{blogs.map((blog) => (
				<Link key={blog.id} to={`/blogs/${blog.id}`}>
					<div style={blogStyle}>{blog.title}</div>
				</Link>
			))}
		</div>
	);
};

export default BlogView;
