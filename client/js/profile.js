"use strict";
/*eslint-disable */
let role = sessionStorage.getItem('role');
window.onload = function () {
    authenticate();
    fetchProfile();
    document.getElementById('logoutBtn').onclick = logout;
    document.getElementById('homePage').onclick = returnHome;
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

function logout() {
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    window.location = 'http://localhost:8080/prepair/login'
}
async function fetchProfile() {
    const userEmail = JSON.parse(sessionStorage.getItem('permission')).email;
    const response = await fetch(`http://localhost:8080/prepair/user/${userEmail}`);
    const result = await response.json();
    if (result.error) {
        window.location = 'http://localhost:8080/prepair/login'
    } else {
        if (result.data.Role === "Student") {
            const { Firstname, Lastname, Role, Gender, Age, email, Image, YearInSchool, University, Major, Address, Bio, Active, Mentors } = result.data;
            document.getElementById('userName').innerHTML = `${Firstname} ${Lastname}`;
            document.getElementById('userRole').innerHTML = Role;
            document.getElementById('fnameUpdate').value = Firstname;
            document.getElementById('lnameUpdate').value = Lastname;
            Gender === "Male" ? document.getElementById('Male').checked = true : document.getElementById('Female').checked = true;
            document.getElementById('userAge').value = Age;
            document.getElementById('userEmail').value = email;
            document.getElementById('student').checked = true;
            document.getElementById('userBio').innerHTML = Bio;
            document.getElementById('userSchool').value = University;
            document.getElementById('userMajor').value = Major;
            document.getElementById('userYear').value = YearInSchool;
            document.getElementById('userCurrentAdd').value = Address;
            document.getElementById('userImage').src = `../images/${Image}`;

        } else if (result.data.Role === "Mentor") {
            const { Firstname, Lastname, Role, Gender, Age, email, Image, Company, Job, LevelOfEducation, University, Major, Address, Discipline, Bio, Active, Mentees } = result.data;
            document.getElementById('userName').innerHTML = `${Firstname} ${Lastname}`;
            document.getElementById('userRole').innerHTML = Role;
            document.getElementById('fnameUpdate').value = Firstname;
            document.getElementById('lnameUpdate').value = Lastname;
            Gender === "Male" ? document.getElementById('Male').checked = true : document.getElementById('Female').checked = true;
            document.getElementById('userAge').value = Age;
            document.getElementById('userEmail').value = email;
            document.getElementById('mentor').checked = true;
            document.getElementById('userBio').innerHTML = Bio;
            document.getElementById('userCurrentAdd').value = Address;
            document.getElementById('userImage').src = `../images/${Image}`;
            document.getElementById('userSchool').value = University;
            document.getElementById('userMajor').value = Major;
            document.getElementById('yearInSchool').style.display = "none";
            document.getElementById('compCont').style.display = "block";
            document.getElementById('jobCont').style.display = "block";
            document.getElementById('edLevCont').style.display = "block";
            document.getElementById('userCompany').value = Company;
            document.getElementById('userJob').value = Job;
            document.getElementById('userLevEd').value = LevelOfEducation;
        }
    }

}
function returnHome() {
    if (role === 'Student') {
        window.location = 'http://localhost:8080/prepair/student';
    } else if (role === 'Mentor') {
        window.location = 'http://localhost:8080/prepair/mentor';
    }
}