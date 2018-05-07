import React from "react";

import classes from "./Employee.css";
import Button from "../../UI/Button/Button";

const employee = props => {
  const { empNum, searchFilter } = props;
  const { name } = props.employee;

  const displayName = name => {
    let newName = [];
    for (let i = 0; i < name.length; i++) {
      if (searchFilter.indexOf(name[i]) !== -1) {
        newName.push(
          <span style={{ fontWeight: "bold", margin: 0 }} key={i}>
            {name[i]}
          </span>
        );
      } else {
        newName.push(
          <span key={i} style={{ margin: 0 }}>
            {name[i]}
          </span>
        );
      }
    }
    return newName;
  };

  return (
    <li
      onClick={() => props.showDetails(props.employee)}
      className={classes.Employee}
    >
      <span>0{empNum} </span>
      <div className={classes.NameAndImgWrapper}>
        <img src={props.employee.employeePhoto} alt="employee" />
        <span>{displayName(name)}</span>
      </div>
      <Button delete={() => props.delete(props.employee)}> X </Button>
    </li>
  );
};

export default employee;
