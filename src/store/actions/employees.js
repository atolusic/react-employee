import * as actionTypes from './actionTypes';

import database from '../../firebase/firebase';

export const setEmployees = (employees) => {
    return {
        type: actionTypes.SET_EMPLOYEES,
        employees
    }
}

export const initEmployees = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.userId;
        database.ref(`users/${uid}/employees`).once('value')
            .then(snapshot => {
                dispatch(setEmployees(snapshot.val()))
            });
    }
}

export const addEmployeSucces = (employee, ref) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_SUCCESS,
        employeeData: employee,
        ref
    }
}

export const addEmployee = (values) => {
    return (dispatch, getState) => {
        const uid = getState().auth.userId;
        database.ref(`users/${uid}/employees`)
            .push(values)
            .then((ref) => dispatch(addEmployeSucces(values, ref))
            );
    }
}

export const deleteEmployeSucces = (id) => {
    return {
        type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
        id
    }
}

export const deleteEmployee = (id) => {
    return (dispatch, getState) => {
        const uid = getState().auth.userId;
        database.ref(`users/${uid}/employees/${id}`)
            .remove()
            .then(() => dispatch(deleteEmployeSucces(id)))
    }
}

export const updateEmployeeSuccess = (id, updates) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_SUCCESS,
        id,
        updates
    }
}

export const updateEmployee = (id, updates) => {
    return dispatch => {
        database.ref(`employees/${id}`)
            .update(updates)
            .then(() => {
                dispatch(updateEmployeeSuccess(id, updates))
            })
    }
}