import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const User = ({ users }) => {
	const id = useParams().id;
	const user = users.find((u) => u.id === id);

	if (!user) {
		return null;
	}

	return (
		<div className="container">
			<NavBar />
			<h1>{user.name}</h1>
			<p>
				<b>added blogs</b>
			</p>
			<ul>
				{user.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

export default User;
