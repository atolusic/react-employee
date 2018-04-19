import * as actionTypes from "./actionTypes";

import { firebase, googleAuthProvider } from "../../firebase/firebase";

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

export const login = user => {
  return {
    type: actionTypes.LOGIN,
    user
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
