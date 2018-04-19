import * as actionTypes from "../actions/actionTypes";

const initialState = {
  employees: null,
  showModal: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
        showModal: false
      };
    case actionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: {
          ...state.employees,
          [action.ref.key]: { ...action.employeeData }
        }
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      const emp = [];
      for (let employee in state.employees) {
        emp.push({
          ...state.employees[employee],
          id: employee
        });
      }

      const newEmp = emp.filter(employee => employee.id !== action.id);

      let employees = {};

      for (let employee of newEmp) {
        employees = {
          ...employees,
          [employee.id]: { ...employee }
        };
      }

      return {
        ...state,
        employees
      };
    case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        showModal: true,
        employees: {
          ...state.employees,
          [action.id]: { ...action.updates }
        }
      };
    case actionTypes.ADD_EMPLOYEE_DESCRIPTION_SUCCESS:
      return {
        ...state,
        employees: {
          ...state.employees,
          [action.id]: {
            ...state.employees[action.id],
            description: action.desc
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
