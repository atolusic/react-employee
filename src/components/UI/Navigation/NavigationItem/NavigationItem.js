import React from "react";
import { NavLink, Link } from "react-router-dom";

import classes from "./NavigationItem.css";
import Popup from "../../../UI/Popup/Popup";

const navigationItem = props => {
  return (
    <li
      onClick={props.clicked}
      className={
        props.userPhoto ? classes.NavigationItemPhoto : classes.NavigationItem
      }
    >
      {props.link ? (
        <NavLink to={props.link}>{props.children}</NavLink>
      ) : (
        <button>{props.children}</button>
      )}
      {props.popup ? (
        <Popup>
          <Link to="/profile">Profile</Link>
          <button onClick={props.logout}>Logout</button>
        </Popup>
      ) : null}
    </li>
  );
};

export default navigationItem;
