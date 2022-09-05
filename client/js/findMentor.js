"use strict";
/*eslint-disable */
let role = sessionStorage.getItem('role');
window.onload = function () {
    authenticate();
    document.getElementById('homePage').onclick = returnHome;
    document.getElementById('logoutBtn').onclick = logout;
    document.getElementById('searchBtn').onclick = fetchMentors;
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
    window.location = 'http://localhost:8080/prepair/student';
}

function logout() {
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    window.location = 'http://localhost:8080/prepair/login'
}
async function fetchMentors() {
    let discipline = document.getElementById('discipline').value;
    const response = await fetch(`http://localhost:8080/prepair/getMentors/${discipline}`);
    const result = await response.json();
    const mentors = result.data;
    if (mentors.length === 0) {
        document.getElementById('noMentors').style.display = 'block';
        let container = document.getElementById('fetchedMentors');
        container.innerHTML = '';
    } else {
        document.getElementById('noMentors').style.display = 'none';
        let container = document.getElementById('fetchedMentors');
        container.innerHTML = '';
        mentors.forEach(element => {
            container.innerHTML += `<div class="col-4 mentor-card">
                <div class="card h-100">
                    <img src="../images/${element.Image}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${element.Firstname} ${element.Lastname}</h5>
                        <p class="card-text"><label class="job">${element.Job}</label> at <label class="company">${element.Company}</label> <label class="bio">${element.Bio}</label></p>
                    </div>
                    <button class="button">Contact</button>
                </div>
            </div>`
        });
    }
}