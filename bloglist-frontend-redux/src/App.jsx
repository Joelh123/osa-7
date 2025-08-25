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
import { addBlog, initializeBlogs } from "./reducers/blogReducer";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	const blogFormRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
	}, [dispatch]);

	const blogs = useSelector((state) => state.blogs);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
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
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			dispatch(setErrorMessage("Wrong credentials"));
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.clear();
		setUser(null);
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
		blogService
			.update(blog.id, {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes + 1,
				user: blog.user._id,
			})
			.then((response) => {
				const updatedBlog = {
					...response,
					user: typeof response.user === "object" ? response.user : blog.user,
				};
				setBlogs(
					blogs
						.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
						.sort((a, b) => b.likes - a.likes)
				);
			});
	};

	const removeBlog = (blogToRemove) => {
		if (
			window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		) {
			blogService.remove(blogToRemove.id).then((response) => {
				setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
			});

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

	return <div>{user === null ? loginForm() : blogForm(user)}</div>;
};

export default App;
