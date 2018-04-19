import React from "react";

import classes from "./Popup.css";

const popup = props => <div className={classes.Popup}>{props.children}</div>;

export default popup;
