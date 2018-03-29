import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Auxiliary from '../../hoc/Auxiliary';
import { addEmployee, updateEmployee } from '../../store/actions/employees';
import FormErrors from './FormErrors/FormErrors';

class EmployeeForm extends Component {
    state = {
        name: this.props.add ? '' : this.props.updateName,
        age: this.props.add ? 18 : this.props.updateAge,
        formErrors:{
            name: '',
            age: ''
        },
        nameValid: false,
        ageValid: false,
        formValid: false
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.name;
        let ageValid = this.state.age;

        switch(fieldName) {
          case 'name':
            nameValid = value.trim() !== '';
            fieldValidationErrors.name = nameValid ? '' : ' is invalid!';
            break;
          case 'age':
            ageValid = value >= 18;
            fieldValidationErrors.age = ageValid ? '' : ' - you are not old enough to work!';
            break;
          default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
            nameValid: nameValid,
            ageValid: ageValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.nameValid && this.state.ageValid});
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        if(!this.props.add) {
            this.props.detailHandler(name, value);
        }

        this.setState({[name]: value}, () => {
            this.validateField(name, value)
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let employee = {
            name: this.state.name,
            age: this.state.age
        }

        const id = this.props.id;

        if(this.props.add) {
            this.props.addEmployee(employee);
        } else {
            this.props.updateEmployee(id, employee);
            setTimeout(() => {
                this.props.history.push('/employees')
            }, 2500)
        }

        this.setState({ name: '', age: 18 });
    }

    render() {
        return (
            <Auxiliary>
                {console.log(this.props)}
                <FormErrors formErrors={this.state.formErrors} />
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <label>Name: </label>
                    <input
                        required
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={(e) => this.handleUserInput(e)} />
                    <label>Age: </label>
                    <input
                        required
                        name="age"
                        type="number"
                        value={this.state.age}
                        onChange={(e) => this.handleUserInput(e)} />
                    <button disabled={!this.state.formValid}>{this.props.add ? 'ADD EMPLOYE' : 'UPDATE'}</button>
                </form>
            </Auxiliary>
        );
    }
}

export default withRouter(connect(null, { addEmployee, updateEmployee })(EmployeeForm));