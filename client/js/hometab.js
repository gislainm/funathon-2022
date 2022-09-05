"use strict";
/*eslint-disable */
window.onload = function () {
    authenticate();
    document.getElementById('logoutBtn').onclick = logout;
    // document.getElementById('profilePage').onclick = fetchProfile;
    // document.getElementById('messagesPage').onclick = fetchMessage;
    // document.getElementById('mentorPage').onclick = fetchMentor;
}

function logout() {
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    window.location = 'http://localhost:8080/prepair/login'
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


