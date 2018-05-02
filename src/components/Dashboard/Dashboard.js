import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import Button from "../UI/Button/Button";
import { initEmployees } from "../../store/actions/employees";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Dashboard.css";
import MapComponent from "../UI/MapComponent/MapComponenet";

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
      <div>
        <div className={classes.Dashboard}>
          {this.props.company ? (
            <div>
              <h2>Top Employees</h2>
              <NavLink to="/employees" />
              <ul>{employees}</ul>
              <MapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          ) : (
            <div className={classes.DashboardCreateButtonWrapper}>
              <Button>Create company</Button>
            </div>
          )}
        </div>
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
