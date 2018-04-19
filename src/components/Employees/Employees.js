import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddEmployee from './AddEmployee/AddEmployee';
import Employee from './Employee/Employee';
import classes from './Employees.css';
import { initEmployees, addEmployee, deleteEmployee } from '../../store/actions/employees';
import Spinner from '../UI/Spinner/Spinner';
import SearchEmployee from '../SearchEmployee/SearchEmployee';
import Modal from '../UI/Modal/Modal';
import DeleteModal from '../UI/DeleteModal/DeleteModal';

class Employees extends Component {

    state = {
        selectedEmployee: null,
        searchFilter: '',
        showModal: false,
        readyForDelete: null
    }

    componentDidMount() {
        this.props.initEmployees();
    }

    showDetalisHandler = (selectedEmployee) => {
        this.setState({ selectedEmployee })
    }

    onDeleteClickHandler = (employee) => {
        this.setState({ showModal: true, readyForDelete: employee });
    }

    onSearchHandler = (e) => {
        this.setState({ searchFilter: e.target.value })
    }

    deleteHandler = (e) => {
        if(e.target.name === 'Yes') {
            this.props.deleteEmployee(this.state.readyForDelete.id);
            this.setState({ readyForDelete: null, showModal: false });
        } else {
            this.setState({ showModal: false, readyForDelete: null });
        }
    }

    render() {
        let employees = <Spinner />

        if(this.props.employees) {

            const fetchedEmployees = [];
                for(let employee in this.props.employees) {
                    fetchedEmployees.push({
                        ...this.props.employees[employee],
                        id: employee
                    });
                }

            employees = fetchedEmployees.map((employee, i) => {
                return (
                    <Employee
                        empNum={i + 1}
                        key={employee.id}
                        employee={employee}
                        showDetails={this.showDetalisHandler}
                        delete={this.onDeleteClickHandler} />
                );
            }).filter(employee => {
                return employee.props.employee.name.toLowerCase().includes(this.state.searchFilter);
            })
        }

        let employeeDetails = this.props.employees ? <p className={classes.SelectedEmployee}>Click on employee for details!</p> : null;

        if(this.state.selectedEmployee) {
            if(this.props.employees[this.state.selectedEmployee.id]) {
                employeeDetails = (
                    <div className={classes.SelectedEmployee}>
                        <p><span>Employee Name: </span>{this.state.selectedEmployee.name}</p>
                        <p><span>Employee Age:  </span>{this.state.selectedEmployee.age}</p>
                        <Link
                            to={{pathname: `${this.props.match.path}/${this.state.selectedEmployee.id}`,
                            state: {name: this.state.selectedEmployee.name, age: this.state.selectedEmployee.age, id: this.state.selectedEmployee.id}
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
                                employees={this.props.employees ? false : true}
                                search={this.state.searchFilter}
                                searchHandler={this.onSearchHandler} />
                            <ul className={classes.EmployeeList}>
                                {employees}
                            </ul>
                        </div>
                        <Modal show={this.state.showModal}>
                            <DeleteModal
                                employee={this.state.readyForDelete}
                                deleteHandler={this.deleteHandler} />
                        </Modal>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees.employees
    }
}

export default connect(mapStateToProps, { initEmployees, addEmployee, deleteEmployee })(Employees);