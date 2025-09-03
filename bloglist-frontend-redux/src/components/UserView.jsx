import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const UserView = ({ users }) => (
	<div className="container">
		<NavBar />
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
						<td>
							<Link to={`/users/${user.id}`}>{user.name}</Link>
						</td>
						<td>{user.blogs.length}</td>
					</tr>
				))}
			</tbody>
		</Table>
	</div>
);

export default UserView;
