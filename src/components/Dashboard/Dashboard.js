import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../UI/Button/Button";
import { initCompany } from "../../store/actions/employees";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./Dashboard.css";
import MapComponent from "../UI/MapComponent/MapComponenet";

class Dashboard extends Component {
  componentDidMount() {
    this.props.initCompany();
  }

  render() {
    const { history, location, company, showCreateButton } = this.props;

    let companyData = <Spinner />;

    if (company.name !== "") {
      companyData = (
        <div>
          <h2>{company.name}</h2>
          <MapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      );
    }

    /////////////////////////////////
    /////* EMPLOYEES STRUCTURE */////
    ////////////////////////////////

    /* if (this.props.employees) {
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
    } */

    return (
      <div className={classes.Dashboard}>
        {showCreateButton ? (
          <div className={classes.DashboardCreateButtonWrapper}>
            <Button clicked={() => history.push(`${location.pathname}/create`)}>
              Create company
            </Button>
          </div>
        ) : (
          companyData
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.employees.company,
    showCreateButton: state.employees.showCreateButton
  };
};

export default connect(mapStateToProps, { initCompany })(Dashboard);
