import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import { ErrorMessageContextProvider } from "./contexts/ErrorMessageContext";
import { UserContextProvider } from "./contexts/UserContext";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<ErrorMessageContextProvider>
					<App />
				</ErrorMessageContextProvider>
			</NotificationContextProvider>
		</UserContextProvider>
	</QueryClientProvider>
);
