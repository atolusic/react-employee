import React from "react";

import classes from "./DeleteModal.css";

const deleteModal = props => {
  return (
    <div className={classes.DeleteModal}>
      <p>
        Are you sure you want to delete{" "}
        {props.employee ? props.employee.name : ""}?
      </p>
      <button name="Yes" onClick={e => props.deleteHandler(e)}>
        Yes
      </button>
      <button name="No" onClick={e => props.deleteHandler(e)}>
        No
      </button>
    </div>
  );
};

export default deleteModal;
