import { createContext, useEffect, useReducer } from "react";

const UserContext = createContext();

const initialState = {
  user: null,
  loading: true,
  error: null,
};

const actionTypes = {
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  ADD_TO_CART: "ADD_TO_CART",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  console.log("provider", state);
  const fetchUserProfile = async () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        credentials: "include",
      });
      const data = await response.json();
      dispatch({ type: actionTypes.SET_USER, payload: data.payload });
    } catch (error) {
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Run this effect once on component mount

  //   console.log(state);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserContext, UserProvider, actionTypes };
