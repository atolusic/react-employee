import * as actionTypes from './actionTypes';
import axios from 'axios';

import { firebase, googleAuthProvider } from '../../firebase/firebase';

// export const authStart = () => {
//     console.log('dispatched')
//     return {
//         type: actionTypes.AUTH_START
//     };
// };

// export const authSuccess = (token, userId) => {
//     return {
//         type: actionTypes.AUTH_SUCCESS,
//         idToken: token,
//         userId
//     };
// };

// export const authFail = (error) => {
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error
//     };
// };

// export const logout = () => {
//     return {
//         type: actionTypes.AUTH_LOGOUT
//     }
// }

// export const checkAuthTimeout = expTime => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expTime * 1000);
//     }
// }

// export const auth = (email, password, isSignup) => {
//     return dispatch => {
//         dispatch(authStart());
//         const authData = {
//             email,
//             password,
//             returnSecureToken: true
//         }
//         let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCH_1qu7WdBD8Cjrvf3sigcKM22jkmY_4Q';
//         if(!isSignup) {
//             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCH_1qu7WdBD8Cjrvf3sigcKM22jkmY_4Q';
//         }
//         axios.post(url, authData)
//             .then(res => {
//                 console.log(res);
//                 dispatch(authSuccess(res.data.idToken, res.data.localId));
//                 dispatch(checkAuthTimeout(res.data.expiresIn));
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch(authFail(err.response.data.error));
//             })
//     };
// };

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