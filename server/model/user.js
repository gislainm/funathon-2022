"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    Gender: { type: String, required: true },
    Age: Number,
    Company: String,
    Job: String,
    LevelOfEducation: String,
    YearInSchool: String,
    University: String,
    Major: String,
    Address: String,
    Discipline: [String],
    Active: Boolean,
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

const Model = mongoose.model('User', userSchema);
module.exports = Model;