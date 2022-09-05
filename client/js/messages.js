"use strict";
/*eslint-disable */
let role = sessionStorage.getItem('role');
window.onload = function () {
    document.getElementById('homePage').onclick = returnHome;
    if (role === "Mentor") {
        document.getElementById('mentorPage').style.display = 'none';
    }
}
function returnHome() {
    if (role === 'Student') {
        window.location = 'http://localhost:8080/prepair/student';
    } else if (role === 'Mentor') {
        window.location = 'http://localhost:8080/prepair/mentor';
    }
}
