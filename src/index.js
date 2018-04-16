import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import employeeReducer from './store/reducers/employeesReducer';
import authReducer from './store/reducers/authReducer';
import { firebase } from './firebase/firebase';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    employees: employeeReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))
);

const history = createHistory();

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
        console.log(user);
    } else {
        history.push('/');
    }
})

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
