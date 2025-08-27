import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
	const notification = useNotificationValue();

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
