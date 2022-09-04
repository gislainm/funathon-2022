"use strict";
/*eslint-disable */

const User = require('../model/user');
const responseInfo = require('../model/responseInfo');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
let SECRET = "login key for Pre-Pair users";

exports.homepage = async (req, res, next) => {
    console.log('homepage');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'html', 'home.html'));
}

exports.loginPage = async (req, res, next) => {
    console.log('login page');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'html', 'login1.html'));
}
exports.questionnaire = async (req, res, next) => {
    console.log("questionnaire page");
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'html', 'questionaire.html'))
}
exports.userPage = async (req, res, next) => {
    console.log('user page');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'html', 'profile.html'));
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const Password = req.body.Password;
    const user = await User.findOne({ email });
    if (user) {
        const validPwd = await bcrypt.compare(Password, user.Password);
        if (validPwd) {
            const accessToken = jwt.sign({
                id: user._id,
                email: user.email,
                iat: Date.now()
            }, SECRET);
            res.status(200).json(new responseInfo(false, null, {
                accessToken,
                user
            }))
        } else {
            res.status(400).json(new responseInfo(true, 'wrong password or username', null))
        }
    } else {
        res.status(400).json(new responseInfo(true, 'wrong password or username', null))
    }
}

function verifyAuthentication(accessToken) {
    try {
        let permission = jwt.verify(accessToken, SECRET);
        return new responseInfo(false, null, permission);
    } catch (error) {
        return new responseInfo(true, "Invalid JWT permission", null)
    }
}

exports.signup = async (req, res, next) => {
    const newuser = new User(req.body);
    try {
        await newuser.save()
        res.status(201).json(new responseInfo(false, null, newuser));
    } catch (error) {
        console.log(error)
        res.status(500).json(new responseInfo(true, "signing up user failed", null));
    }
}
exports.completeUserInfo = async (req, res, next) => {
    const email = req.body.email;
    const newUserInfo = req.body.moreInfo
    if (newUserInfo.Gender === "Female") {
        newUserInfo.Image = "user1.png";
    } else if (newUserInfo.Gender === "Male") {
        newUserInfo.Image = "FemaleUser.png";
    }
    try {
        const updateUser = await User.updateOne({ email }, newUserInfo);
        const updatedUser = await User.findOne({ email });
        const accessToken = jwt.sign({
            id: updatedUser._id,
            email: updatedUser.email,
            iat: Date.now()
        }, SECRET);
        res.status(200).json(new responseInfo(false, null, { accessToken, updatedUser }));
    } catch (error) {
        res.status(400).json(new responseInfo(true, "completing user's information failed"))
    }
}

// exports.updateUserInfo = async (req, res, next) => {

// }