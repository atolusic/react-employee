import React, { Component } from "react";
import { connect } from "react-redux";

import Auxiliary from "../Auxiliary";
import Navigation from "../../components/UI/Navigation/NavigationItems";
import classes from "./Layout.css";

class Layout extends Component {
  state = {
    showPopup: false
  };

  showPopup = () => {
    this.setState(prevState => {
      return { showPopup: !prevState.showPopup };
    });
  };

  closePopup(event) {
    return this.state.showPopup ? this.setState({ showPopup: false }) : null;
  }

  render() {
    return (
      <Auxiliary>
        <main
          className={classes.Layout}
          onClick={event => this.closePopup(event)}
        >
          {this.props.uid ? (
            <Navigation
              popup={this.state.showPopup}
              showPopup={this.showPopup}
            />
          ) : null}
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps)(Layout);
