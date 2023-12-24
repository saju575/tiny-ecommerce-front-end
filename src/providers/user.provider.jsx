/* eslint-disable no-case-declarations */
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
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  LOGOUT: "LOGOUT",
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

    case actionTypes.ADD_TO_CART:
      const newItem = action.payload;
      const existingItemIndex = state.user.cart.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItemIndex !== -1) {
        // If the same variant exists, update the quantity
        const updatedCart = [...state.user.cart];
        updatedCart[existingItemIndex].quantity = newItem.quantity;

        const updatedUser = { ...state.user, cart: updatedCart };
        return { ...state, user: updatedUser };
      } else {
        // If it's a new variant, add it to the cart
        const updatedUser = {
          ...state.user,
          cart: [...state.user.cart, action.payload],
        };
        return { ...state, user: updatedUser };
      }
    case actionTypes.REMOVE_FROM_CART:
      const { productId, color, size } = action.payload;
      const updatedCart = state.user.cart.filter(
        (item) =>
          item.productId !== productId ||
          item.color !== color ||
          item.size !== size
      );

      const updatedUser = { ...state.user, cart: updatedCart };
      return { ...state, user: updatedUser };
    case actionTypes.LOGOUT:
      return { ...state, user: null, error: null };
    default:
      return state;
  }
};
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUserProfile = async () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response = await fetch(
        "https://tiny-ecommerce.onrender.com/api/users/profile",
        {
          credentials: "include",
        }
      );
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
