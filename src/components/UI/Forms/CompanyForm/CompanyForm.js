import React, { Component } from "react";
import Input from "../Input/Input";

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
    }
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

  render() {
    const { companyForm } = this.state;
    const formElementsArray = [];

    for (let key in companyForm) {
      formElementsArray.push({ id: key, config: companyForm[key] });
    }
    return (
      <form>
        {formElementsArray.map(el => (
          <Input
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={e => this.inputChangedHandler(e, el.id)}
          />
        ))}
      </form>
    );
  }
}

export default CompanyForm;
