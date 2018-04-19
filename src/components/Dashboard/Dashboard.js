import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import { initEmployees } from "../../store/actions/employees";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Dashboard.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.initEmployees();
  }

  render() {
    let employees = <Spinner />;

    if (this.props.employees) {
      const fetchedEmployees = [];
      for (let employee in this.props.employees) {
        fetchedEmployees.push({
          ...this.props.employees[employee],
          id: employee
        });
      }

      employees = fetchedEmployees
        .map((employee, i) => {
          return (
            <li key={employee.id}>
              <Link to={`/employees/${employee.id}`} details={employee}>
                {employee.name}
              </Link>
            </li>
          );
        })
        .slice(0, 5);
    }

    return (
      <div className={classes.Dashboard}>
        <h2>Top Employees</h2>
        <NavLink to="/employees" />
        <ul>{employees}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.employees
  };
};

export default connect(mapStateToProps, { initEmployees })(Dashboard);
