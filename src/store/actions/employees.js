import * as actionTypes from "./actionTypes";

import { firebase } from "../../firebase/firebase";
import database from "../../firebase/firebase";

export const createCompany = companyDetails => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}`)
      .child("company")
      .set(companyDetails)
      .then(() => dispatch(createCompanySuccess(companyDetails)));
  };
};

export const createCompanySuccess = companyDetails => {
  return {
    type: actionTypes.CREATE_COMPANY_SUCCESS,
    companyDetails
  };
};

export const initCompany = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/company`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          return dispatch(initCompanySuccess(snapshot.val()));
        } else {
          return dispatch(showCreateButton());
        }
      });
  };
};

export const showCreateButton = () => {
  return {
    type: actionTypes.SHOW_CREATE_BUTTON,
    showCreateButton: true
  };
};

export const initCompanySuccess = company => {
  return {
    type: actionTypes.INIT_COMPANY_SUCCESS,
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

export const addEmployeSucces = (employee, ref, companyId) => {
  return {
    type: actionTypes.ADD_EMPLOYEE_SUCCESS,
    employeeData: employee,
    companyId,
    ref
  };
};

export const addEmployee = values => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/company/employees`)
      .push(values)
      .then(ref => dispatch(addEmployeSucces(values, ref)));
  };
};

export const deleteEmployeSuccess = id => {
  return {
    type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
    id
  };
};

export const deleteEmployee = id => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/company/employees/${id}`)
      .remove()
      .then(() => dispatch(deleteEmployeSuccess(id)));
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
      .ref(`users/${uid}/company/employees/${id}`)
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
