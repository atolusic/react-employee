import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';

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


const app = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        console.log('log in');
    } else {
        console.log('log out');
    }
})

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
