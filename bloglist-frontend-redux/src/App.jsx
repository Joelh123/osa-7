import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import blogService from "./services/blogs";
import BlogView from "./components/BlogView";
import LoginView from "./components/LoginView";
import { setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUsers } from "./reducers/usersReducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUsers());
	}, [dispatch]);

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

	const views = () => (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginView />} />
				<Route path="*" element={<BlogView />} />
			</Routes>
		</Router>
	);

	return views();
};

export default App;
