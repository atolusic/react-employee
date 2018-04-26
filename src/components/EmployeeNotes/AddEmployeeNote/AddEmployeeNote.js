import React, { Component } from "react";
import { connect } from "react-redux";

import { addNote } from "../../../store/actions/notes";
import Auxiliary from "../../../hoc/Auxiliary";

class addEmployeeNote extends Component {
  state = {
    overallRating: 0,
    rateInput: 0,
    noteInput: "",
    rateValid: false,
    formValid: false
  };

  conutRating(propType) {
    let rateings = [];
    for (let note in propType.employee.notes) {
      rateings.push(parseInt(propType.employee.notes[note].review, 10));
    }
    return rateings.reduce((acc, next) => {
      return acc + next;
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employee.notes) {
      let rateing = 0;
      if (
        Object.keys(this.props.employee.notes).length !==
        Object.keys(nextProps.employee.notes).length
      ) {
        rateing = this.conutRating(nextProps);
        this.setState(
          {
            overallRating:
              rateing / (Object.keys(nextProps.employee.notes).length - 1)
          },
          () => {
            this.props.getRating(this.state.overallRating);
          }
        );
      }
    }
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value }, () => {
      if (name === "rateInput") {
        this.validateField(name, value);
      }
    });
  }

  validateField(fieldName, value) {
    let rateValid = this.state.rateInput;
    switch (fieldName) {
      case "rateInput":
        rateValid = value >= 1 && value <= 5;
        break;
      default:
        break;
    }

    this.setState({ rateValid: rateValid }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.rateValid });
  }

  componentDidMount() {
    let rateing = this.conutRating(this.props);
    if (Object.keys(this.props.employee.notes).length > 1) {
      this.setState(
        {
          overallRating:
            rateing / (Object.keys(this.props.employee.notes).length - 1)
        },
        () => {
          this.props.getRating(this.state.overallRating);
        }
      );
    }
  }

  onSubmit(e, date) {
    e.preventDefault();

    let noteAndRating = {
      note: this.state.noteInput,
      noteDate: date,
      review: this.state.rateInput
    };

    this.props.addNote(this.props.id, noteAndRating);
    this.setState({ rateInput: 0 });
  }

  render() {
    const date = new Date()
      .toUTCString()
      .split(" ")
      .slice(0, 5)
      .join(" ");

    return (
      <Auxiliary>
        <form onSubmit={e => this.onSubmit(e, date)}>
          <p>
            Rate or add notes for this working day. ({date
              .split(" ")
              .slice(0, 4)
              .join(" ")})
          </p>
          <label htmlFor="noteInput">Notes</label>
          <textarea name="noteInput" onChange={e => this.handleUserInput(e)} />
          <label htmlFor="rateInput">Rate employee 1-5.</label>
          <input
            name="rateInput"
            type="number"
            onChange={e => this.handleUserInput(e)}
            value={this.state.rateInput}
          />
          <button disabled={!this.state.formValid}>KLIK</button>
        </form>
      </Auxiliary>
    );
  }
}

export default connect(null, { addNote })(addEmployeeNote);
