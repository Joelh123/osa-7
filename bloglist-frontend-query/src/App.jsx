import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ErrorMessage from "./components/ErrorMessage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import { useNotificationDispatch } from "./contexts/NotificationContext";
import { useErrorMessageDispatch } from "./contexts/ErrorMessageContext";
import { useUserDispatch, useUserValue } from "./contexts/UserContext";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const blogFormRef = useRef();

	const userDispatch = useUserDispatch();
	const notificationDispatch = useNotificationDispatch();
	const errorMessageDispatch = useErrorMessageDispatch();

	const queryClient = useQueryClient();

	const result = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		reFetchOnWindowFocus: false,
	});

	const blogs = result.data;
	const user = useUserValue();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			userDispatch({ type: "SET", payload: user });
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
			userDispatch({ type: "SET", payload: user });
			setUsername("");
			setPassword("");
		} catch (exception) {
			errorMessageDispatch({ type: "SET", payload: "Wrong credentials" });

			setTimeout(() => {
				errorMessageDispatch({ type: "CLEAR" });
			}, 5000);
		}
	};

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.clear();
		userDispatch({ type: "CLEAR" });
	};

	const createBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility();
		newBlogMutation.mutate(blogObject);
	};

	const newBlogMutation = useMutation({
		mutationFn: blogService.create,
		onSuccess: (newBlog) => {
			const blogs = queryClient.getQueryData(["blogs"]);
			queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
			notificationDispatch({
				type: "SET",
				payload: `a new blog ${newBlog.title} by ${newBlog.author} added`,
			});
			setTimeout(() => {
				notificationDispatch({ type: "CLEAR" });
			}, 5000);
		},
		onError: () => {
			errorMessageDispatch({ type: "SET", payload: "Fill every field" });

			setTimeout(() => {
				errorMessageDispatch({ type: "CLEAR" });
			}, 5000);
		},
	});

	const updateBlog = (blog) => {
		updateBlogMutation.mutate({
			...blog,
			likes: blog.likes + 1,
			user: blog.user.id || blog.user,
		});
	};

	const updateBlogMutation = useMutation({
		mutationFn: blogService.update,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
		},
	});

	const removeBlog = (blogToRemove) => {
		if (
			window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
		) {
			removeBlogMutation.mutate(blogToRemove);
		} else {
			return null;
		}
	};

	const removeBlogMutation = useMutation({
		mutationFn: blogService.remove,
		onSuccess: (removedBlog) => {
			queryClient.setQueryData(
				["blogs"],
				blogs.filter((blog) => blog.id !== removedBlog.id)
			);

			notificationDispatch({
				type: "SET",
				payload: `${removedBlog.title} has been deleted`,
			});

			setTimeout(() => {
				notificationDispatch({ type: "CLEAR" });
			}, 5000);
		},
	});

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (!result.isSuccess && !result.isLoading) {
		return <div>anecdote service not available duo to problems in server</div>;
	}

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

	const blogForm = (user) => {
		return (
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
	};

	return <div>{user === null ? loginForm() : blogForm(user)}</div>;
};

export default App;
