"use strict";
/*eslint-disable */

const User = require('../model/user');
const Message = require('../model/messages');
const MessageRoom = require('../model/messageRoom');
const responseInfo = require('../model/responseInfo');
const { ObjectId } = require('mongodb');
const path = require('path');

const createMessageRoom = async (receiver, sender, messageId) => {
    const newMessageRoom = new MessageRoom({
        participants: [sender, receiver],
        messages: [messageId]
    });
    try {
        await newMessageRoom.save();
        console.log("room created");
    } catch (error) {
        console.log("room creation failed");
    }
}

exports.sendMessage = async (req, res, next) => {
    const receiver = await User.findOne({ email: req.body.receiver })
    const receiverId = receiver._id.toString();
    const sender = req.body.sender;
    const newMessage = new Message({
        sender,
        message: req.body.message,
        receiver: receiverId,
        timeSent: Date.now()
    })
    try {
        await newMessage.save();
        const messageRoom = await MessageRoom.findOne({ participants: { $all: [ObjectId(receiverId), ObjectId(sender)] } });
        if (messageRoom) {
            const updateRoom = await MessageRoom.findOneAndUpdate({ participants: { $all: [ObjectId(receiverId), ObjectId(sender)] } }, { $push: { messages: newMessage._id.toString() } });
        } else {
            createMessageRoom(receiverId, sender, newMessage._id.toString());
        }
        res.status(201).json(new responseInfo(false, null, newMessage));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Creating a new message failed", null));
    }
}

exports.message = async (req, res, next) => {
    console.log('message');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'html', 'message.html'));
}

// exports.getAllMessages = async (req, res, next) => {

// }