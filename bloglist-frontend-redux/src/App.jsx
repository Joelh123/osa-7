import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import blogService from "./services/blogs";
import BlogView from "./components/BlogView";
import LoginView from "./components/LoginView";
import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";
import User from "./components/User";
import UserView from "./components/UserView";
import Blog from "./components/Blog";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, [dispatch]);

	const user = useSelector((state) => state.user);
	const users = useSelector((state) => state.users);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		console.log(user);
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginView />} />
				<Route path="*" element={user ? <BlogView /> : <LoginView />} />
				<Route path="/users" element={<UserView users={users} />} />
				<Route path="/users/:id" element={<User users={users} />} />
				<Route path="/blogs" element={<BlogView />} />
				<Route path="/blogs/:id" element={<Blog />} />
			</Routes>
		</Router>
	);
};

export default App;
