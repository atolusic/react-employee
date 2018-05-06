import * as actionTypes from "../actions/actionTypes";

const initialState = {
  company: null,
  showModal: false,
  showCreateButton: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_COMPANY_SUCCESS:
      return {
        ...state,
        showCreateButton: false,
        company: {
          ...action.company
        }
      };
    case actionTypes.SHOW_CREATE_BUTTON:
      return {
        ...state,
        showCreateButton: action.showCreateButton
      };
    // case actionTypes.SET_EMPLOYEES:
    //   return {
    //     ...state,
    //     // employees: { ...action.employees },
    //     company: {
    //       ...state.company,
    //       employees: action.employees
    //     },
    //     showModal: false
    //   };
    case actionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          [action.companyId]: {
            ...state.company[action.companyId],
            employees: {
              ...state.company[action.companyId].employees,
              [action.ref.key]: { ...action.employeeData }
            }
          }
        }
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      const emp = [];
      const companyEmployees = state.company[action.companyId].employees;
      for (let employee in companyEmployees) {
        emp.push({
          ...companyEmployees[employee],
          id: employee
        });
      }

      console.log(emp);

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
        company: {
          ...state.company[action.companyId],
          employees
        }
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
    case actionTypes.GET_USER_PHOTO_SUCCESS:
      return {
        ...state,
        employees: {
          ...state.employees,
          [action.id]: {
            ...state.employees[action.id],
            employeePhoto: action.imgURL
          }
        }
      };
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
    case actionTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          [action.ref.key]: {
            ...action.companyDetails
          }
        }
      };
    default:
      return state;
  }
};

export default reducer;
