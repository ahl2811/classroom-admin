import React, { createContext, useReducer } from "react";
import { UserAction } from "./actions";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

const store = createContext({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case UserAction.LoginSuccess:
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user,
      };
    case UserAction.Logout:
      localStorage.removeItem("user");
      return { ...state, user: null };
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, AppProvider };
