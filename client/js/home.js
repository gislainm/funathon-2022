"use strict";
/* eslint-disable */

window.onload = function () {
    document.getElementById('loginBtn').onclick = changePage;
    document.getElementById('signuBtn').onclick = changePage;
}
async function changePage() {
    window.location = 'http://localhost:8080/prepair/login'
}