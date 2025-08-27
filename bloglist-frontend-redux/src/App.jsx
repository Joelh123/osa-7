import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { setNotification } from "./reducers/notificationReducer";
import { setErrorMessage } from "./reducers/errorMessageReducer";
import { setUser, clearUser } from "./reducers/userReducer";
import {
	addBlog,
	deleteBlog,
	initializeBlogs,
	likeBlog,
} from "./reducers/blogReducer";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const blogFormRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		console.log(user);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			dispatch(setUser(user));
			setUsername("");
			setPassword("");
		} catch (exception) {
			dispatch(setErrorMessage("Wrong credentials"));
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.clear();
		dispatch(clearUser());
		console.log(user);
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

	const updateBlog = (blog) => {
		dispatch(likeBlog(blog, user));
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

	const loginForm = () => (
		<>
			<h1 data-testid="login-header">Login</h1>
			<Notification />
			<ErrorMessage />
			<LoginForm
				handleLogin={handleLogin}
				setUsername={setUsername}
				setPassword={setPassword}
				username={username}
				password={password}
			/>
		</>
	);

	const blogForm = (user) => (
		<div>
			<h1>blogs</h1>
			<Notification />
			<ErrorMessage />
			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<Togglable buttonLabel={"new blog"} ref={blogFormRef}>
				<BlogForm createBlog={createBlog} />
			</Togglable>
			{blogs.map((blog) => (
				<Blog
					key={blog.id}
					blog={blog}
					updateBlog={updateBlog}
					removeBlog={removeBlog}
					user={user}
				/>
			))}
		</div>
	);

	return <div>{!user ? loginForm() : blogForm(user)}</div>;
};

export default App;
