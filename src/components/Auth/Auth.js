import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Auth.css";
import Button from "../UI/Button/Button";
import { startLogin } from "../../store/actions/auth";

class Auth extends Component {
  render() {
    return (
      <div className={classes.Auth}>
        <div className={classes.Gradient} />
        <div className={classes.LoginBox}>
          <p>
            Easy company managment | Login with your Google acccount to check
            all the features.
          </p>
          <div className={classes.LoginButtonWrapper}>
            <Button clicked={this.props.startLogin}>Log In With Google</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { startLogin })(Auth);
