import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";

import EmployeeForm from "../UI/Forms/EmployeeForm/EmployeeForm";
import Modal from "../UI/Modal/Modal";
import {
  initCompany,
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
    this.props.initCompany();
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
    const { showNotes } = this.state;
    const { employees } = this.props;

    if (employees) {
      let description = (
        <div>
          {employees[this.props.match.params.id].description ? (
            <Auxiliary>
              <p>{employees[this.props.match.params.id].description}</p>
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
              src={employees[this.props.match.params.id].employeePhoto}
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
              {employees[this.props.match.params.id].gender}
            </p>
            <div>
              <strong>Description:</strong> &nbsp; {description}
            </div>
          </div>
          <EmployeeForm
            id={this.props.match.params.id}
            updateName={employees[this.props.match.params.id].name}
            updateAge={employees[this.props.match.params.id].age}
            detailHandler={this.onDetailChangeHandler}
            showDescriptionTextArea={this.state.showDescriptionTextArea}
            description={this.state.description}
            addDescriptionHandler={this.addDescriptionHandler}
          />
          <EmployeeNotes
            showNotes={showNotes}
            getRating={this.getRating}
            employee={employees[this.props.match.params.id]}
            id={this.props.match.params.id}
          />
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
    show: state.employees.showModal,
    employees: state.employees.company.employees
  };
};

export default withRouter(
  connect(mapStateToProps, {
    initCompany,
    addEmployeeDescription
  })(EmployeeDetail)
);
