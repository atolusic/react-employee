import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Employees from "./components/Employees/Employees";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <PrivateRoute
              exact
              path="/employees/:id"
              component={EmployeeDetail}
            />
            <PrivateRoute exact path="/employees" component={Employees} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route exact path="/" component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
