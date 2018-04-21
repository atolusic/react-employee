import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EmployeeForm from "../EmployeeForm/EmployeeForm";
import Modal from "../UI/Modal/Modal";
import {
  initEmployees,
  addEmployeeDescription
} from "../../store/actions/employees";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./EmployeeDetail.css";
import Auxiliary from "../../hoc/Auxiliary";
import UploadImage from "../UploadImage/UploadImage";

class EmployeeDetail extends Component {
  state = {
    name: "",
    age: 18,
    description: "",
    showDescriptionTextArea: false,
    uploadImageCtrl: false
  };

  componentDidMount() {
    this.props.initEmployees();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.employees) {
      this.setState({
        name: nextProps.employees[this.props.match.params.id].name,
        age: nextProps.employees[this.props.match.params.id].age
      });
    }
  }

  onDetailChangeHandler = (name, value) => {
    this.setState({ [name]: value });
  };

  addDescriptionHandler = description => {
    this.setState(
      {
        description,
        showDescriptionTextArea: false
      },
      () => {
        let description = {
          description: this.state.description
        };
        this.props.addEmployeeDescription(
          this.props.match.params.id,
          description
        );
      }
    );
  };

  closeUploadImageCtrl = () => {
    this.setState({ uploadImageCtrl: false });
  };

  render() {
    let detail = <Spinner />;

    if (this.props.employees) {
      let description = (
        <div>
          {this.props.employees[this.props.match.params.id].description ? (
            <Auxiliary>
              {this.props.employees[this.props.match.params.id].description}
              <button
                onClick={event =>
                  this.setState(prevState => {
                    return {
                      showDescriptionTextArea: !prevState.showDescriptionTextArea
                    };
                  })
                }
              >
                {this.state.showDescriptionTextArea
                  ? "Dissmis"
                  : "Edit Description"}
              </button>
            </Auxiliary>
          ) : (
            <button
              onClick={event =>
                this.setState(prevState => {
                  return {
                    showDescriptionTextArea: !prevState.showDescriptionTextArea
                  };
                })
              }
            >
              {this.state.showDescriptionTextArea
                ? "Dissmis"
                : "Add Description"}
            </button>
          )}
        </div>
      );

      detail = (
        <Auxiliary>
          <Modal show={this.props.show}>
            Employee details updated successfully!
          </Modal>
          <div className={classes.DetailText}>
            <p>
              <strong>Name:</strong> &nbsp; {this.state.name}
            </p>
            <p>
              <strong>Age:</strong> &nbsp; {this.state.age}
            </p>
          </div>
          <p>
            <strong>Description:</strong> &nbsp; {description}
          </p>
          <figure
            className={classes.EmployeePhotoWrapper}
            onClick={event => this.setState({ uploadImageCtrl: true })}
          >
            <img
              alt="user"
              src={
                this.props.employees[this.props.match.params.id].employeePhoto
              }
            />
            <figcaption>Update profile photo</figcaption>
          </figure>
          <EmployeeForm
            id={this.props.match.params.id}
            updateName={this.props.employees[this.props.match.params.id].name}
            updateAge={this.props.employees[this.props.match.params.id].age}
            detailHandler={this.onDetailChangeHandler}
            showDescriptionTextArea={this.state.showDescriptionTextArea}
            description={this.state.description}
            addDescriptionHandler={this.addDescriptionHandler}
          />
          {this.state.uploadImageCtrl ? (
            <UploadImage
              id={this.props.match.params.id}
              closeUploadImageCtrl={this.closeUploadImageCtrl}
            />
          ) : null}
        </Auxiliary>
      );
    }

    return <div className={classes.EmployeeDetail}>{detail}</div>;
  }
}

const mapStateToProps = state => {
  return {
    show: state.showModal,
    employees: state.employees.employees
  };
};

export default withRouter(
  connect(mapStateToProps, {
    initEmployees,
    addEmployeeDescription
  })(EmployeeDetail)
);
