import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Auxiliary from "../../hoc/Auxiliary";
import { addEmployee, updateEmployee } from "../../store/actions/employees";
import FormErrors from "./FormErrors/FormErrors";
import classes from "./EmployeeForm.css";
import Button from "../UI/Button/Button";
import RadioButtons from "../UI/RadioButtons/RadioButtons";

class EmployeeForm extends Component {
  state = {
    name: this.props.add ? "" : this.props.updateName,
    age: this.props.add ? 18 : this.props.updateAge,
    isMale: this.props.add ? true : null,
    formErrors: {
      name: "",
      age: ""
    },
    nameValid: false,
    ageValid: true,
    formValid: false,
    textareaDesc: ""
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.name;
    let ageValid = this.state.age;

    switch (fieldName) {
      case "name":
        nameValid = value.trim() !== "";
        fieldValidationErrors.name = nameValid ? "" : " is invalid!";
        break;
      case "age":
        ageValid = value >= 18;
        fieldValidationErrors.age = ageValid
          ? ""
          : " - you are not old enough to work!";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        ageValid: ageValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.ageValid });
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    if (!this.props.add) {
      this.props.detailHandler(name, value);
    }

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  onClickChangeGenderHandler = () => {
    this.setState(prevState => {
      return {
        isMale: !prevState.isMale
      };
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const id = this.props.id;

    let employee = null;

    if (this.props.employees) {
      employee = {
        ...this.props.employees[id],
        name: this.state.name,
        age: this.state.age
      };
    }

    if (this.props.add) {
      employee = {
        name: this.state.name,
        age: this.state.age,
        description: "",
        gender: this.state.isMale ? "M" : "F",
        notes: {
          initialNote: {
            review: 0
          }
        },
        employeePhoto: this.state.isMale
          ? "https://firebasestorage.googleapis.com/v0/b/employee-base.appspot.com/o/gender_photos%2FBusinessman.png?alt=media&token=0843aad9-6531-4384-b25b-3115ec4fe83f"
          : "https://firebasestorage.googleapis.com/v0/b/employee-base.appspot.com/o/gender_photos%2Fzensko.png?alt=media&token=6bd6ae02-2d7b-4f80-afd8-1b19c66b1f63"
      };
    }

    if (this.props.add) {
      this.props.addEmployee(employee);
    } else {
      this.props.updateEmployee(id, employee);
      setTimeout(() => {
        this.props.history.push("/employees");
      }, 2500);
    }

    this.setState({ name: "", age: 18 });
  }

  render() {
    return (
      <Auxiliary>
        <FormErrors formErrors={this.state.formErrors} />
        <form className={classes.EmployeeForm} onSubmit={e => this.onSubmit(e)}>
          <input
            id="name"
            placeholder="Employee Name"
            required
            name="name"
            type="text"
            value={this.state.name}
            onChange={e => this.handleUserInput(e)}
          />
          <label htmlFor="name" className={classes.EmployeeForm_label}>
            Employee Name
          </label>
          <input
            id="age"
            className={
              this.state.ageValid ? classes.AgeValid : classes.AgeInvalid
            }
            placeholder="Employee Age"
            required
            name="age"
            type="number"
            value={this.state.age}
            onChange={e => this.handleUserInput(e)}
          />
          <label htmlFor="age" className={classes.EmployeeForm_label}>
            Employee Age
          </label>
          {this.props.add ? (
            <RadioButtons
              labels={["M", "F"]}
              radioButtonFor="gender"
              isMale={this.state.isMale}
              onClickChangeGenderHandler={this.onClickChangeGenderHandler}
            />
          ) : null}
          {this.props.showDescriptionTextArea ? (
            <div>
              <textarea
                onChange={event =>
                  this.setState({ textareaDesc: event.target.value })
                }
              />
              <button
                type="button"
                onClick={event =>
                  this.props.addDescriptionHandler(this.state.textareaDesc)
                }
              >
                Add
              </button>
            </div>
          ) : null}
          <Button disabled={!this.state.formValid}>
            {this.props.add ? "ADD EMPLOYE" : "UPDATE"}
          </Button>
        </form>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.employees
  };
};

export default withRouter(
  connect(mapStateToProps, { addEmployee, updateEmployee })(EmployeeForm)
);
