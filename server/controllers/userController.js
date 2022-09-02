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
exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (user) {
        const validPwd = await bcrypt.compare(password, user.password);
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
        }
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
    try {
        const updateUser = await User.updateOne({ email }, newUserInfo);
        const updatedUser = await User.findOne({ email });
        res.status(200).json(new responseInfo(false, null, updatedUser));
    } catch (error) {
        res.status(400).json(new responseInfo(true, "completing user's information failed"))
    }
}

// exports.updateUserInfo = async (req, res, next) => {

// }