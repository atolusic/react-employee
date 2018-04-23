import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_NOTE_SUCCESS:
      return {
        ...state,
        employees: {
          ...state.employees,
          [action.id]: {
            ...state.employees[action.id],
            notes: {
              ...state.employees[action.id].notes,
              [action.ref.key]: { ...action.values }
            }
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
