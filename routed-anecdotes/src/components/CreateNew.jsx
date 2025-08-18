import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
	const { clear: clearContent, ...content } = useField("text");
	const { clear: clearAuthor, ...author } = useField("text");
	const { clear: clearInfo, ...info } = useField("text");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate("/");
		props.setNotification(`a new anecdote ${content.value} created!`);
		setTimeout(() => {
			props.setNotification("");
		}, 5000);
	};

	const clearFields = () => {
		clearContent();
		clearAuthor();
		clearInfo();
	};

	return (
		<div>
			<h2>create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					content
					<input {...content} />
				</div>
				<div>
					author
					<input {...author} />
				</div>
				<div>
					url for more info
					<input {...info} />
				</div>
				<button type="submit">create</button>
				<button key="b" type="button" onClick={() => clearFields()}>
					reset
				</button>
			</form>
		</div>
	);
};

export default CreateNew;
