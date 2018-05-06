import React from "react";
import { connect } from "react-redux";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";
import Logo from "../Logo/Logo";
import { startLogout } from "../../../store/actions/auth";

const navigation = props => {
  const { company } = props;

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/dashboard">Dashboard</NavigationItem>
      <Logo />
      <NavigationItem link="/employees" disabled={company.name ? false : true}>
        Employees
      </NavigationItem>
      <NavigationItem
        logout={props.startLogout}
        popup={props.popup}
        clicked={props.showPopup}
        userPhoto={props.userPhoto}
      >
        <img alt="User" src={props.userPhoto} />
      </NavigationItem>
    </ul>
  );
};

const mapStateToProps = state => ({
  userPhoto: state.auth.user.photoURL,
  company: state.employees.company
});

export default connect(mapStateToProps, { startLogout })(navigation);
