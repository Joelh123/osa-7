const Anecdote = ({ anecdoteById, vote }) => {
	return (
		<div>
			<h2>
				{anecdoteById.content} by {anecdoteById.author}
			</h2>
			<p>has {anecdoteById.votes} votes</p>
			<p>
				for more info see <a href={anecdoteById.info}>{anecdoteById.info}</a>
			</p>
		</div>
	);
};

export default Anecdote;
