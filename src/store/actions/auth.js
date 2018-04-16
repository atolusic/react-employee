import * as actionTypes from './actionTypes';
import axios from 'axios';

import { firebase, googleAuthProvider } from '../../firebase/firebase';

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

export const login = (uid) => {
    return {
        type: actionTypes.LOGIN,
        uid
    }
}

export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}