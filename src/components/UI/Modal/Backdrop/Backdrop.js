import React from "react";

import classes from "./Backdrop.css";

const backdrop = props =>
  props.show ? (
    <div
      className={
        props.modalForImage ? classes.BackdropForImage : classes.Backdrop
      }
      onClick={props.clicked}
    />
  ) : null;

export default backdrop;
