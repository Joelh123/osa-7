import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setErrorMessage } from "../reducers/errorMessageReducer";
import { setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			navigate("/blogs");
			setUsername("");
			setPassword("");
		} catch (exception) {
			dispatch(setErrorMessage("Wrong credentials"));
		}
	};
	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					data-testid="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					data-testid="password"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};

export default LoginForm;
