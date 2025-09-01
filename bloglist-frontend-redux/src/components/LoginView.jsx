import Notification from "./Notification";
import ErrorMessage from "./ErrorMessage";
import LoginForm from "./LoginForm";

const LoginView = () => (
	<div className="container">
		<h1 data-testid="login-header">Login</h1>
		<Notification />
		<ErrorMessage />
		<LoginForm />
	</div>
);

export default LoginView;
