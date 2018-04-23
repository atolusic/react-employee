import * as actionTypes from "./actionTypes";
import database from "../../firebase/firebase";

export const addNote = (id, values) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/employees/${id}/notes`)
      .push(values)
      .then(ref => {
        dispatch(addNoteSuccess(id, values, ref));
      });
  };
};

export const addNoteSuccess = (id, values, ref) => {
  return {
    type: actionTypes.ADD_NOTE_SUCCESS,
    id,
    values,
    ref
  };
};
