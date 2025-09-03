import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../reducers/userReducer";

const NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);

	const handleLogout = (event) => {
		event.preventDefault();

		window.localStorage.clear();
		dispatch(clearUser());
		navigate("/login");
		console.log(user);
	};

	const padding = {
		paddingRight: 5,
	};

	return (
		<div>
			<Link style={padding} to={"/blogs"}>
				blogs
			</Link>
			<Link style={padding} to={"/users"}>
				users
			</Link>
			{user.name} logged in <button onClick={handleLogout}>logout</button>
			<h1>Blog app</h1>
		</div>
	);
};

export default NavBar;
