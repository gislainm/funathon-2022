"use strict";
/*eslint-disable */
let User = require('./main');
let newUser = require('./questionnaire');
// import User from './main';
// import newUser from './questionnaire';
let currentUser;
window.onload = function () {
    if (User) {
        currentUser = User;
        console.log("hey");
    } else if (newUser) {
        currentUser = newUser;
        console.log("okay");
    }
}