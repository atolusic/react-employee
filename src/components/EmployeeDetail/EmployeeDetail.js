import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../UI/Modal/Modal';
import { initEmployees } from '../../store/actions/employees';
import Spinner from '../UI/Spinner/Spinner';

class EmployeeDetail extends Component {

    state = {
        name: '',
        age: 18
    }

    componentDidMount() {
        this.props.initEmployees();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.employees) {
            this.setState({
                name: nextProps.employees[this.props.match.params.id].name,
                age: nextProps.employees[this.props.match.params.id].age
            })
        }
    }

    onDetailChangeHandler = (name, value) => {
        this.setState({[name]: value});
    }

    render() {

        let detail = <Spinner />

        if(this.props.employees) {
            detail = (
                <div>
                    <Modal show={this.props.show}>Employee details updated successfully!</Modal>
                    <h3>Name: {this.state.name}</h3>
                    <h4>Age: {this.state.age}</h4>
                    <EmployeeForm
                        id={this.props.match.params.id}
                        updateName={this.props.employees[this.props.match.params.id].name}
                        updateAge={this.props.employees[this.props.match.params.id].age}
                        detailHandler={this.onDetailChangeHandler} />
                </div>
            );
        }

        return detail;
    }
}

const mapStateToProps = (state) => {
    return {
        show: state.showModal,
        employees: state.employees
    }
}

export default withRouter(connect(mapStateToProps, { initEmployees })(EmployeeDetail));
