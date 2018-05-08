import * as actionTypes from "../actions/actionTypes";

const initialState = {
  company: {
    name: "",
    location: "",
    email: "",
    description: "",
    employees: null
  },
  showModal: false,
  showCreateButton: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        company: {
          ...action.companyDetails
        }
      };
    case actionTypes.INIT_COMPANY_SUCCESS:
      return {
        ...state,
        showCreateButton: false,
        showModal: false,
        company: {
          ...state.company,
          ...action.company
        }
      };
    case actionTypes.SHOW_CREATE_BUTTON:
      return {
        ...state,
        showCreateButton: action.showCreateButton
      };
    case actionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          employees: {
            ...state.company.employees,
            [action.ref.key]: { ...action.employeeData }
          }
        }
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      const emp = [];
      const companyEmployees = state.company.employees;
      for (let employee in state.company.employees) {
        emp.push({
          ...companyEmployees[employee],
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
        company: {
          ...state.company,
          employees
        }
      };
    case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        showModal: true,
        company: {
          ...state.company,
          employees: {
            ...state.company.employees,
            [action.id]: { ...action.updates }
          }
        }
      };
    case actionTypes.ADD_EMPLOYEE_DESCRIPTION_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          employees: {
            ...state.company.employees,
            [action.id]: {
              ...state.company.employees[action.id],
              description: action.desc
            }
          }
        }
      };
    case actionTypes.GET_USER_PHOTO_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          employees: {
            ...state.company.employees,
            [action.id]: {
              ...state.company.employees[action.id],
              employeePhoto: action.imgURL
            }
          }
        }
      };
    case actionTypes.ADD_NOTE_SUCCESS:
      return {
        ...state,
        company: {
          ...state.company,
          employees: {
            ...state.company.employees,
            [action.id]: {
              ...state.company.employees[action.id],
              notes: {
                ...state.company.employees[action.id].notes,
                [action.ref.key]: { ...action.values }
              }
            }
          }
        }
      };

    default:
      return state;
  }
};

export default reducer;
