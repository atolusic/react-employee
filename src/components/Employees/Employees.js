import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AddEmployee from "./AddEmployee/AddEmployee";
import Employee from "./Employee/Employee";
import classes from "./Employees.css";
import {
  initCompany,
  addEmployee,
  deleteEmployee
} from "../../store/actions/employees";
import Spinner from "../UI/Spinner/Spinner";
import SearchEmployee from "../SearchEmployee/SearchEmployee";
import Modal from "../UI/Modal/Modal";
import DeleteModal from "../UI/DeleteModal/DeleteModal";

class Employees extends Component {
  state = {
    selectedEmployee: null,
    searchFilter: "",
    showModal: false,
    showImgModal: false,
    readyForDelete: null
  };

  componentDidMount() {
    this.props.initCompany();
  }

  showDetalisHandler = selectedEmployee => {
    this.setState({ selectedEmployee });
  };

  onDeleteClickHandler = employee => {
    this.setState({ showModal: true, readyForDelete: employee });
  };

  onSearchHandler = e => {
    this.setState({ searchFilter: e.target.value });
  };

  deleteHandler = e => {
    if (e.target.name === "Yes") {
      this.props.deleteEmployee(this.state.readyForDelete.id);
      this.setState({ readyForDelete: null, showModal: false });
    } else {
      this.setState({ showModal: false, readyForDelete: null });
    }
  };

  render() {
    const { employees } = this.props;
    let companyEmployees = <Spinner />;

    if (employees) {
      const fetchedEmployees = [];
      for (let employee in employees) {
        fetchedEmployees.push({
          ...employees[employee],
          id: employee
        });
      }
      companyEmployees = fetchedEmployees
        .map((employee, i) => {
          return (
            <Employee
              empNum={i + 1}
              key={employee.id}
              employee={employee}
              showDetails={this.showDetalisHandler}
              delete={this.onDeleteClickHandler}
            />
          );
        })
        .filter(employee => {
          return employee.props.employee.name
            .toLowerCase()
            .includes(this.state.searchFilter);
        });
    }

    let employeeDetails = employees ? (
      <p className={classes.SelectedEmployee}>Click on employee for details!</p>
    ) : null;

    if (this.state.selectedEmployee) {
      if (employees[this.state.selectedEmployee.id]) {
        employeeDetails = (
          <div className={classes.SelectedEmployee}>
            <div className={classes.SelectedEmployeeDetails}>
              <img
                onClick={e => this.setState({ showImgModal: true })}
                className={classes.SelectedEmployeePhoto}
                src={this.state.selectedEmployee.employeePhoto}
                alt="user"
              />

              <div className={classes.SelectedEmployeeText}>
                <p>
                  <span>Employee Name: </span>
                  {this.state.selectedEmployee.name}
                </p>
                <p>
                  <span>Employee Age: </span>
                  {this.state.selectedEmployee.age}
                </p>
              </div>
            </div>
            <Link
              to={{
                pathname: `${this.props.match.path}/${
                  this.state.selectedEmployee.id
                }`,
                state: {
                  name: this.state.selectedEmployee.name,
                  age: this.state.selectedEmployee.age,
                  id: this.state.selectedEmployee.id
                }
              }}
            >
              Show Details →
            </Link>
          </div>
        );
      }
    }

    return (
      <div className={classes.Employees}>
        <h2>Employees</h2>
        <div className={classes.Employees_forms}>
          <div className={classes.Employees_forms_left}>
            <AddEmployee />
          </div>
          <div className={classes.Employees_forms_right}>
            <h3>Employee Details</h3>
            {employeeDetails}
            <SearchEmployee
              employees={employees ? false : true}
              search={this.state.searchFilter}
              searchHandler={this.onSearchHandler}
            />
            <ul className={classes.EmployeeList}>{companyEmployees}</ul>
          </div>
          <Modal show={this.state.showModal}>
            <DeleteModal
              employee={this.state.readyForDelete}
              deleteHandler={this.deleteHandler}
            />
          </Modal>
        </div>
        {this.state.selectedEmployee ? (
          <Modal
            show={this.state.showImgModal}
            modalForImage
            modalClosed={() => {
              this.setState({ showImgModal: false });
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                width: "100%"
              }}
            >
              <img
                src={this.state.selectedEmployee.employeePhoto}
                alt="user"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "5px"
                }}
              />
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.company.employees
  };
};

export default connect(mapStateToProps, {
  initCompany,
  addEmployee,
  deleteEmployee
})(Employees);
