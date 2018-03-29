import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Employees from './components/Employees/Employees';
import EmployeeDetail from './components/EmployeeDetail/EmployeeDetail';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/employees/:id" component={EmployeeDetail} />
            <Route exact path="/employees" component={Employees} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/" render={() => (
              <Redirect to="/dashboard" />
            )} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
