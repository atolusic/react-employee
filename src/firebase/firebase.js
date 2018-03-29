import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCH_1qu7WdBD8Cjrvf3sigcKM22jkmY_4Q",
    authDomain: "employee-base.firebaseapp.com",
    databaseURL: "https://employee-base.firebaseio.com",
    projectId: "employee-base",
    storageBucket: "employee-base.appspot.com",
    messagingSenderId: "741636569376"
};

firebase.initializeApp(config);

const datebase = firebase.database();

export { firebase, datebase as default };