import React from "react";

import EmployeeForm from "../../EmployeeForm/EmployeeForm";
import classes from "./AddEmployee.css";

const addEmployee = props => {
  return (
    <div className={classes.AddEmployee}>
      <h3>Add Employee</h3>
      <EmployeeForm add />
    </div>
  );
};

export default addEmployee;
