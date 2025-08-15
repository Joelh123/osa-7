import { Routes, Route, Link } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import CreateNew from "./CreateNew";
import About from "./About";

const Menu = ({ anecdotes, addNew }) => {
	const padding = {
		paddingRight: 5,
	};
	return (
		<>
			<div>
				<Link style={padding} to="/">
					anecdotes
				</Link>
				<Link style={padding} to="/create">
					create new
				</Link>
				<Link style={padding} to="/about">
					about
				</Link>
			</div>
			<Routes>
				<Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
				<Route path="/create" element={<CreateNew addNew={addNew} />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</>
	);
};

export default Menu;
