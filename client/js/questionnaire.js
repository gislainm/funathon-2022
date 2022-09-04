"use strict";
/*eslint-disable */
window.onload = function () {
    document.getElementById('submitBtn').onclick = completeUserInfo;
    let userRole = sessionStorage.getItem('role');
    if (userRole === 'Student') {
        document.getElementById('vCompany-cont').style.display = 'none';
        document.getElementById('vjob-cont').style.display = 'none';
        document.getElementById('levelEd-cont').style.display = 'none';
        document.getElementById('YearInS-cont').style.display = 'block';
        document.getElementById('yearInSchool').style.display = 'block';
        document.getElementById('Vmajor-cont').style.display = 'none';
        document.getElementById('Vschool-cont').style.display = 'none';
        document.getElementById('Smajor-cont').style.display = 'block';
        document.getElementById('Sschool-cont').style.display = 'block';
        document.getElementById('discipline-cont').style.display = 'none';
    }
}

let User;

async function completeUserInfo() {
    let userRole = sessionStorage.getItem('role');
    let email = sessionStorage.getItem('email');
    let Gender = document.getElementById('gender').value;
    let Age = document.getElementById('age').value;
    let YearInSchool;
    let Company;
    let Job;
    let LevelOfEducation;
    let Major;
    let University;
    let Address = document.getElementById('address').value + " " + document.getElementById('address2').value + ", " + document.getElementById('city').value + ", " + document.getElementById('state').value + " " + document.getElementById('zipcode').value;
    let Discipline = [];
    let Bio = document.getElementById('bio').value;
    if (userRole === "Student") {
        YearInSchool = document.getElementById('yearInSchool').value;
        Major = document.getElementById('sMajor').value;
        University = document.getElementById('Sschool').value;
        const response = await fetch('http://localhost:8080/prepair/complete', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                moreInfo: {
                    Gender,
                    Age,
                    YearInSchool,
                    Major,
                    University,
                    Bio,
                    Address
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        User = await response.json();
        sessionStorage.setItem('accessToken', User.data.accessToken);
        // console.log(User);
        window.location = 'http://localhost:8080/prepair/userPage'

    } else if (userRole === "Mentor") {
        Company = document.getElementById('company').value;
        Job = document.getElementById('job').value;
        LevelOfEducation = document.getElementById('levelEd').value;
        Major = document.getElementById('vMajor').value;
        University = document.getElementById('vSchool').value;
        let allDiscipline = document.getElementsByName('discipline');
        for (let i = 0; i < allDiscipline.length; i++) {
            if (allDiscipline[i].checked) {
                Discipline.push(allDiscipline[i].value);
            }
        }
        const response = await fetch('http://localhost:8080/prepair/complete', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                moreInfo: {
                    Gender,
                    Age,
                    Company,
                    Job,
                    LevelOfEducation,
                    Major,
                    University,
                    Bio,
                    Address,
                    Discipline
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        User = await response.json();
        sessionStorage.setItem('accessToken', User.data.accessToken);
        // console.log(User);
        window.location = 'http://localhost:8080/prepair/userPage'
    }
}

