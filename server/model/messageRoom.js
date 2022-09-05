"use strict";
/*eslint-disable */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageRoom = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
})

const Model = mongoose.model('MessageRoom', messageRoom);
module.exports = Model;