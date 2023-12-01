import { createContext, useEffect, useReducer } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext({
  user: null,
  authIsReady: false,
  dispatch: ({}) => {},
}); // we create a context with initial state

export const authReducer = (state, action) => {
  //reducer function which helps us control the state
  switch (action.type) {
    case "LOGIN": //if user is logging in we have the same state, but user needs to be updated
      return { ...state, user: action.payload };

    case "LOGOUT":
      return { ...state, user: null }; //if user is logging out we have the same state, but user does not exist

    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true }; //when auth is ready we change the prop of authIsReady to true

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  }); //initial state

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, (user) => {
      //console.log(user);

      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []); //check to see if user is logged in when page loads

  //console.log('AuthContext state = ', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};