import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { initEmployees } from '../../store/actions/employees';
import Spinner from '../UI/Spinner/Spinner';

class Dashboard extends Component {

    componentDidMount() {
        this.props.initEmployees();
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
                        <Link key={employee.id} to={`/employees/${employee.id}`} details={employee} >
                            {employee.name}
                        </Link>
                    );
                }).slice(0, 5);
            }

        return (
            <div>
                <h2>Top Employees</h2>
                <NavLink to="/employees"></NavLink>
                <ul>
                    {employees}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

export default connect(mapStateToProps, { initEmployees })(Dashboard);