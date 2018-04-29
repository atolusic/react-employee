import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Transition } from "react-transition-group";

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
import EmployeeNotes from "../EmployeeNotes/EmployeeNotes";
import Button from "../UI/Button/Button";

class EmployeeDetail extends Component {
  state = {
    name: "",
    age: 18,
    description: "",
    showDescriptionTextArea: false,
    uploadImageCtrl: false,
    rating: 0,
    showNotes: false
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

  getRating = overall => {
    this.setState({ rating: overall });
  };

  render() {
    let detail = <Spinner />;

    if (this.props.employees) {
      let description = (
        <div>
          {this.props.employees[this.props.match.params.id].description ? (
            <Auxiliary>
              <p>
                {this.props.employees[this.props.match.params.id].description}
              </p>
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
          <StarRatings
            rating={this.state.rating}
            starDimension="30px"
            starSpacing="3px"
            starRatedColor="#FDE16D"
          />
          <div className={classes.DetailText}>
            <p>
              <strong>Name:</strong> &nbsp; {this.state.name}
            </p>
            <p>
              <strong>Age:</strong> &nbsp; {this.state.age}
            </p>
            <p>
              <strong>Gender:</strong> &nbsp;
              {this.props.employees[this.props.match.params.id].gender}
            </p>
            <div>
              <strong>Description:</strong> &nbsp; {description}
            </div>
          </div>
          <EmployeeForm
            id={this.props.match.params.id}
            updateName={this.props.employees[this.props.match.params.id].name}
            updateAge={this.props.employees[this.props.match.params.id].age}
            detailHandler={this.onDetailChangeHandler}
            showDescriptionTextArea={this.state.showDescriptionTextArea}
            description={this.state.description}
            addDescriptionHandler={this.addDescriptionHandler}
          />
          <Transition in={this.state.showNotes} timeout={1000}>
            {state => (
              <div
                className={`${classes.Square} ${classes[this.state.showNotes]}`}
              >
                <EmployeeNotes
                  toggleVisibility={
                    state === "entering" || state === "entered" ? true : false
                  }
                  getRating={this.getRating}
                  employee={this.props.employees[this.props.match.params.id]}
                  id={this.props.match.params.id}
                />
              </div>
            )}
          </Transition>
          <Button
            clicked={e =>
              this.setState(prevState => {
                return { showNotes: !prevState.showNotes };
              })
            }
          >
            {this.state.showNotes ? "Hide" : "Show Notes And Rates"}
          </Button>

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
