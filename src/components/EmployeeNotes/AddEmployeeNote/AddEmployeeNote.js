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
        let parsed = parseInt(value, 10);
        rateValid = parsed >= 1 && parsed <= 5;
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
    const { addNote, id, disableAddNote } = this.props;
    const { noteInput, rateInput } = this.state;

    e.preventDefault();

    let noteAndRating = {
      note: noteInput,
      noteDate: date,
      review: rateInput
    };

    addNote(id, noteAndRating);
    this.setState({ rateInput: 0, noteInput: "" });
    disableAddNote();
  }

  render() {
    const { noteInput, rateInput, formValid } = this.state;

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
          <textarea
            value={noteInput}
            name="noteInput"
            onChange={e => this.handleUserInput(e)}
          />
          <label htmlFor="rateInput">Rate employee 1-5.</label>
          <input
            name="rateInput"
            type="number"
            onChange={e => this.handleUserInput(e)}
            value={rateInput}
          />
          <button disabled={!formValid}>Add</button>
        </form>
      </Auxiliary>
    );
  }
}

export default connect(null, { addNote })(addEmployeeNote);
