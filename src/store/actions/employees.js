import * as actionTypes from "./actionTypes";

import { firebase } from "../../firebase/firebase";
import database from "../../firebase/firebase";

export const createCompany = companyDetails => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/company`)
      .push(companyDetails)
      .then(ref => dispatch(createCompanySuccess(companyDetails, ref)));
  };
};

export const createCompanySuccess = (companyDetails, ref) => {
  return {
    type: actionTypes.CREATE_COMPANY_SUCCESS,
    companyDetails,
    ref
  };
};

export const initCompany = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/company`)
      .once("value")
      .then(snapshot => {
        dispatch(setEmployees(snapshot.val()));
      });
  };
};

export const setCompany = company => {
  return {
    type: actionTypes.SET_COMPANY,
    company
  };
};

export const setEmployees = employees => {
  return {
    type: actionTypes.SET_EMPLOYEES,
    employees
  };
};

export const initEmployees = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/employees`)
      .once("value")
      .then(snapshot => {
        dispatch(setEmployees(snapshot.val()));
      });
  };
};

export const addEmployeSucces = (employee, ref) => {
  return {
    type: actionTypes.ADD_EMPLOYEE_SUCCESS,
    employeeData: employee,
    ref
  };
};

export const addEmployee = values => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/employees`)
      .push(values)
      .then(ref => dispatch(addEmployeSucces(values, ref)));
  };
};

export const deleteEmployeSucces = id => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
    id
  };
};

export const deleteEmployee = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/employees/${id}`)
      .remove()
      .then(() => dispatch(deleteEmployeSucces(id)));
  };
};

export const updateEmployeeSuccess = (id, updates) => {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_SUCCESS,
    id,
    updates
  };
};

export const updateEmployee = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/employees/${id}`)
      .update(updates)
      .then(() => {
        dispatch(updateEmployeeSuccess(id, updates));
      });
  };
};

export const addEmployeeDescription = (id, values) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/employees/${id}`)
      .update(values)
      .then(() => dispatch(addEmployeeDescriptionSucces(id, values)));
  };
};

export const addEmployeeDescriptionSucces = (id, values) => {
  return {
    type: actionTypes.ADD_EMPLOYEE_DESCRIPTION_SUCCESS,
    id,
    desc: values.description
  };
};

export const uploadImage = (id, image) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return firebase
      .storage()
      .ref(`users/${uid}/employees/${id}`)
      .put(image);
  };
};

export const setEmployeePhoto = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return firebase
      .storage()
      .ref(`users/${uid}/employees/${id}`)
      .getDownloadURL()
      .then(img => {
        const photo = {
          employeePhoto: img
        };
        return database
          .ref(`users/${uid}/employees/${id}`)
          .update(photo)
          .then(imgURL => {
            dispatch(getUserPhotoSuccess(id, photo.employeePhoto));
          });
      });
  };
};

export const getUserPhotoSuccess = (id, imgURL) => {
  return {
    type: actionTypes.GET_USER_PHOTO_SUCCESS,
    id,
    imgURL
  };
};
