import React from "react";

import classes from "./Employee.css";
import Button from "../../UI/Button/Button";

const employee = props => {
  return (
    <li
      onClick={() => props.showDetails(props.employee)}
      className={classes.Employee}
    >
      <span>0{props.empNum} </span>
      <div className={classes.NameAndImgWrapper}>
        <img src={props.employee.employeePhoto} alt="employee" />
        <span>{props.employee.name}</span>
      </div>
      <Button delete={() => props.delete(props.employee)}> X </Button>
    </li>
  );
};

export default employee;
