import React, { Component } from "react";
import { connect } from "react-redux";

import Input from "../Input/Input";
import Spinner from "../../Spinner/Spinner";
import { createCompany } from "../../../../store/actions/employees";

class CompanyForm extends Component {
  state = {
    companyForm: {
      name: this.companyFormInputDetails(
        "input",
        { type: "text", placeholder: "Company Name" },
        ""
      ),
      location: this.companyFormInputDetails(
        "input",
        { type: "text", placeholder: "Company Address" },
        ""
      ),
      email: this.companyFormInputDetails(
        "input",
        { type: "email", placeholder: "Contact Mail" },
        ""
      ),
      description: this.companyFormInputDetails(
        "textarea",
        { placeholder: "Description" },
        ""
      )
    },
    loading: false
  };

  companyFormInputDetails(elementType, elementConfig, value) {
    return {
      elementType,
      elementConfig,
      value
    };
  }

  inputChangedHandler = (event, type) => {
    const value = event.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        companyForm: {
          ...prevState.companyForm,
          [type]: {
            ...prevState.companyForm[type],
            value
          }
        }
      };
    });
  };

  onSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });

    const { companyForm } = this.state;
    const { history, createCompany } = this.props;

    const formData = {
      employees: {}
    };
    for (let key in companyForm) {
      formData[key] = companyForm[key].value;
    }

    createCompany(formData).then(() => {
      this.setState({ loading: false });
      history.goBack();
    });
  }

  render() {
    const { companyForm, loading } = this.state;

    const formElementsArray = [];

    for (let key in companyForm) {
      formElementsArray.push({ id: key, config: companyForm[key] });
    }

    let form = <Spinner />;

    if (loading === false) {
      form = (
        <form onSubmit={e => this.onSubmit(e)}>
          {formElementsArray.map(el => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
              changed={e => this.inputChangedHandler(e, el.id)}
            />
          ))}
          <button type="submit">kli</button>
        </form>
      );
    }

    return form;
  }
}

export default connect(null, { createCompany })(CompanyForm);
