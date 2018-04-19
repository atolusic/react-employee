import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isAuthed, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthed ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = state => ({
  isAuthed: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute);
