import React from "react";

import Logo from "../../../assets/favicon.png";
import classes from "./Logo.css";

const logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={Logo} alt="MyLogo" />
    </div>
  );
};

export default logo;
