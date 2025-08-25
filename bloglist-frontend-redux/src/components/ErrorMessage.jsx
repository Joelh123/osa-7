import { useSelector } from "react-redux";

const ErrorMessage = () => {
	const errorMessage = useSelector((state) => state.errorMessage);

	const errorStyle = {
		color: "red",
		fontSize: 16,
		background: "lightgrey",
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (!errorMessage) {
		return null;
	}

	return (
		<div style={errorStyle} className="error">
			{errorMessage}
		</div>
	);
};

export default ErrorMessage;
