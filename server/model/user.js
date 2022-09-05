"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const userSchema = new Schema({
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    Gender: String,
    Age: Number,
    Image: String,
    Company: String,
    Job: String,
    LevelOfEducation: String,
    YearInSchool: String,
    University: String,
    Major: String,
    Address: String,
    Mentors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    Mentees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    Discipline: [String],
    Bio: String,
    Active: Boolean,
})

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.Password, salt);
        this.Password = hashPassword;
        this.Active = true;
        if (this.Gender === "Male") {
            this.Image = "user1.png";
        } else if (this.Gender === "Female") {
            this.Image = "FemaleUser.png";
        }
        next();
    } catch (error) {
        next(error);
    }
});
const Model = mongoose.model('User', userSchema);
module.exports = Model;