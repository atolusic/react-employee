import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmployeeForm from '../EmployeeForm/EmployeeForm';
import Modal from '../UI/Modal/Modal';

class EmployeeDetail extends Component {

    state = {
        name: this.props.location.state.name,
        age: this.props.location.state.age
    }

    onDetailChangeHandler = (name, value) => {
        this.setState({[name]: value});
    }

    render() {
        return (
                <div>
                    <Modal show={this.props.show}>Employee details updated successfully!</Modal>
                    <h3>Name: {this.state.name}</h3>
                    <h4>Age: {this.state.age}</h4>
                    <EmployeeForm
                        id={this.props.location.state.id}
                        updateName={this.state.name}
                        updateAge={this.state.age}
                        detailHandler={this.onDetailChangeHandler} />
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        show: state.showModal
    }
}

export default connect(mapStateToProps)(EmployeeDetail);