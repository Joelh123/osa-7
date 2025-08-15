import { Routes, Route, Link, useMatch } from "react-router-dom";
import AnecdoteList from "./AnecdoteList";
import Anecdote from "./Anecdote";
import CreateNew from "./CreateNew";
import About from "./About";

const Menu = ({ anecdotes, addNew, vote }) => {
	const padding = {
		paddingRight: 5,
	};

	const match = useMatch("/:id");
	const anecdoteById = match
		? anecdotes.find((a) => a.id === Number(match.params.id))
		: null;

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
				<Route
					path="/:id"
					element={<Anecdote anecdoteById={anecdoteById} vote={vote} />}
				/>
			</Routes>
		</>
	);
};

export default Menu;
