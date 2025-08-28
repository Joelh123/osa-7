import { createContext, useContext, useReducer } from "react";

const userReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload;
		case "CLEAR":
			return null;
	}
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
	const [user, userDispatch] = useReducer(userReducer, null);

	return (
		<UserContext.Provider value={[user, userDispatch]}>
			{props.children}
		</UserContext.Provider>
	);
};

export const useUserValue = () => {
	const UserAndDispatch = useContext(UserContext);
	return UserAndDispatch[0];
};

export const useUserDispatch = () => {
	const UserAndDispatch = useContext(UserContext);
	return UserAndDispatch[1];
};

export default UserContext;
