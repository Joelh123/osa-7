import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

const User = () => {
	const users = useSelector((state) => state.users);

	return (
		<div className="container">
			<h1>Users</h1>
			<Table striped>
				<tbody>
					<tr>
						<td>
							<b>user</b>
						</td>
						<td>
							<b>blogs created</b>
						</td>
					</tr>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.name}</td>
							<td>{user.blogs.length}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default User;
