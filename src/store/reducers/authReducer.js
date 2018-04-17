import * as actionTypes from '../actions/actionTypes';

const initialState = {}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN:
            console.log(action)
            return {
                ...state,
                user: action.user,
                uid: action.user.uid

            };
        case actionTypes.LOGOUT:
            return {

            };
        default:
            return state;
    }
}

export default reducer;