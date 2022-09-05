"use strict";
/*eslint-disable */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timeSent: String
})
const Model = mongoose.model('Message', messageSchema);
module.exports = Model;