"use strict";
/* eslint-disable */

window.onload = function () {
    document.getElementById('loginBtn').onclick = changePage;
    document.getElementById('signuBtn').onclick = changePage;
}
function changePage() {
    window.location = 'http://127.0.0.1:5500/client/html/login1.html#'
}