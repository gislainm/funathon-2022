"use strict";
/*eslint-disable */
let role = sessionStorage.getItem('role');
window.onload = function () {
    authenticate();
    document.getElementById('homePage').onclick = returnHome;
    document.getElementById('logoutBtn').onclick = logout;
    if (role === "Mentor") {
        document.getElementById('mentorPage').style.display = 'none';
    }
}

async function authenticate() {
    const response = await fetch(`http://localhost:8080/prepair/authenticate`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
    });
    const result = await response.json()
    if (result.error) {
        window.location = 'http://localhost:8080/prepair/login'
    } else {
        sessionStorage.setItem('permission', JSON.stringify(result.data));
    }
}

function returnHome() {
    if (role === 'Student') {
        window.location = 'http://localhost:8080/prepair/student';
    } else if (role === 'Mentor') {
        window.location = 'http://localhost:8080/prepair/mentor';
    }
}

function logout() {
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    window.location = 'http://localhost:8080/prepair/login'
}

