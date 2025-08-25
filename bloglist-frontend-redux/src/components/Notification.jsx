import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	const notificationStyle = {
		color: "green",
		fontSize: 16,
		background: "lightgrey",
		borderStyle: "solid",
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	if (!notification) {
		return null;
	}

	return <div style={notificationStyle}>{notification}</div>;
};

export default Notification;
