import { createContext, useContext, useReducer } from "react";

const errorMessageReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload;
		case "CLEAR":
			return "";
	}
};

const ErrorMessageContext = createContext();

export const ErrorMessageContextProvider = (props) => {
	const [errorMessage, errorMessageDispatch] = useReducer(
		errorMessageReducer,
		""
	);

	return (
		<ErrorMessageContext.Provider value={[errorMessage, errorMessageDispatch]}>
			{props.children}
		</ErrorMessageContext.Provider>
	);
};

export const useErrorMessageValue = () => {
	const ErrorMessageAndDispatch = useContext(ErrorMessageContext);
	return ErrorMessageAndDispatch[0];
};

export const useErrorMessageDispatch = () => {
	const ErrorMessageAndDispatch = useContext(ErrorMessageContext);
	return ErrorMessageAndDispatch[1];
};

export default ErrorMessageContext;
