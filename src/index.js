import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { Router } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { login, logout } from "./store/actions/auth";
import employeeReducer from "./store/reducers/employeesReducer";
import authReducer from "./store/reducers/authReducer";
import { firebase } from "./firebase/firebase";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  employees: employeeReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const history = createHistory();

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(app, document.getElementById("root"));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user));
    renderApp();
    if (history.location.pathname === "/") {
      history.push("/dashboard");
    }
  } else {
    store.dispatch(logout());
    renderApp();
    history.push("/");
  }
});

registerServiceWorker();
