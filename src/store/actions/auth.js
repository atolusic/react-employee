import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    console.log('dispatched')
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = () => {
    return {
        type: actionTypes.AUTH_SUCCESS
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCH_1qu7WdBD8Cjrvf3sigcKM22jkmY_4Q';
        if(!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCH_1qu7WdBD8Cjrvf3sigcKM22jkmY_4Q';
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};