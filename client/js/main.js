"use strict";
/*eslint-disable */
window.onload = function () {
    document.getElementById('signupBtn').onclick = signupUser;
    document.getElementById('loginBtn').onclick = login;
}

let User;
const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    loginPage = document.querySelector(".login-link");

//   js code to show/hide password and change icon
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                })
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                })
            }
        })
    })
})

// js code to appear signup and login form
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
loginPage.addEventListener("click", () => {
    container.classList.remove("active");
});

//Js code for loging in a user
async function login() {
    const email = document.getElementById("email").value;
    const Password = document.getElementById("password").value;
    if (email && Password) {
        const response = await fetch('http://localhost:8080/prepair/login', {
            method: 'Post',
            body: JSON.stringify({
                email,
                Password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        User = await response.json();
        if (User.error) {
            console.log(User);
        } else {
            sessionStorage.setItem('accessToken', User.data.accessToken);
            sessionStorage.setItem('role', User.data.user.Role);
            if (User.data.user.Role === "Student") {
                window.location = 'http://localhost:8080/prepair/student';
            } else if (User.data.user.Role === "Mentor") {
                window.location = 'http://localhost:8080/prepair/mentor';
            }
        }


    }
}


//Js code for signing up and changing the page to questionnaire page
function signupUser() {
    let firstname = document.getElementById('fname').value;
    let lastname = document.getElementById('lname').value;
    let email = document.getElementById('emailSignup').value;
    let password1 = document.getElementById('passwordSignup1').value;
    let password2 = document.getElementById('passwordSignup2').value;
    let role = document.getElementById('role').value;
    if (password1 && firstname && lastname && email && role) {
        if (password1 === password2) {
            registerUser(firstname, lastname, email, password1, role);
        } else {
            document.getElementById('password2Msg').style.display = 'block'
        }
    }
    !password1 ? document.getElementById('password1Msg').style.display = 'block' : document.getElementById('password1Msg').style.display = 'none';
    !firstname ? document.getElementById('firstnameMsg').style.display = 'block' : document.getElementById('firstnameMsg').style.display = 'none';
    !lastname ? document.getElementById('lastnameMsg').style.display = 'block' : document.getElementById('lastnameMsg').style.display = 'none';
    !email ? document.getElementById('EmailMsg').style.display = 'block' : document.getElementById('EmailMsg').style.display = 'none';
    !role ? document.getElementById('roleMsg').style.display = 'block' : document.getElementById('roleMsg').style.display = 'none';
}

async function registerUser(fname, lname, email, password, role) {
    const response = await fetch('http://localhost:8080/prepair/signup', {
        method: 'POST',
        body: JSON.stringify({
            Firstname: fname,
            Lastname: lname,
            email: email,
            Password: password,
            Role: role
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    if (result.error) {
        console.log(result.error)
        console.log(email)
    } else {
        sessionStorage.setItem('role', result.data.Role);
        sessionStorage.setItem('email', result.data.email);
        window.location = 'http://localhost:8080/prepair/questionnaire';
    }
}
