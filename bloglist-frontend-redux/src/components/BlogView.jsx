import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import ErrorMessage from "./ErrorMessage";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";
import { clearUser } from "../reducers/userReducer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Users from "./Users";
import User from "./User";

const BlogView = () => {
	const blogFormRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	const blogs = useSelector((state) => state.blogs);
	const users = useSelector((state) => state.users);

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.clear();
		dispatch(clearUser());
		navigate("/login");
		console.log(user);
	};

	const blogList = (
		<div>
			<Togglable buttonLabel={"new blog"} ref={blogFormRef}>
				<BlogForm blogFormRef={blogFormRef} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);

	return (
		<div className="container">
			<h1>blogs</h1>
			<Notification />
			<ErrorMessage />
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<Routes>
				<Route path="/users" element={<Users users={users} />} />
				<Route path="/users/:id" element={<User users={users} />} />
				<Route path="/blogs" element={blogList} />
			</Routes>
		</div>
	);
};

export default BlogView;
