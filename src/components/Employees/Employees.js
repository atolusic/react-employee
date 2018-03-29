import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import AddEmployee from './AddEmployee/AddEmployee';
import Employee from './Employee/Employee';
import classes from './Employees.css';
import { initEmployees, addEmployee, deleteEmployee } from '../../store/actions/employees';
import Spinner from '../UI/Spinner/Spinner';

class Employees extends Component {

    state = {
        selectedEmployee: null
    }

    componentDidMount() {
        this.props.initEmployees();
    }

    showDetalisHandler = (selectedEmployee) => {
        this.setState({ selectedEmployee })
    }

    onDeleteClickHandler = (employee) => {
        this.props.deleteEmployee(employee.id);
    }

    render() {
        let employees = <Spinner />;

        if(this.props.employees) {

            const fetchedEmployees = [];
                for(let employee in this.props.employees) {
                    fetchedEmployees.push({
                        ...this.props.employees[employee],
                        id: employee
                    });
                }

            employees = fetchedEmployees.map(employee => {
                return (
                    <Employee
                        key={employee.id}
                        employee={employee}
                        showDetails={this.showDetalisHandler}
                        delete={this.onDeleteClickHandler} />
                );
            });
        }

        let employeeDetails = <p>Click on employee for details!</p>;

        if(this.state.selectedEmployee) {
            employeeDetails = (
                    <div>
                        <h3>Employee Details</h3>
                        {this.state.selectedEmployee.name}
                        {this.state.selectedEmployee.age}
                        <Link
                            to={{pathname: `${this.props.match.path}/${this.state.selectedEmployee.id}`,
                            state: {name: this.state.selectedEmployee.name, age: this.state.selectedEmployee.age, id: this.state.selectedEmployee.id}
                            }}
                            >
                            Show Details</Link>
                    </div>
            );
        }

        return (
            <div className={classes.Employees}>
                <h2>Employees</h2>
                <hr />
                <AddEmployee />
                {employees}
                {employeeDetails}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, { initEmployees, addEmployee, deleteEmployee })(Employees);