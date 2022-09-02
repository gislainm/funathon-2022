"use strict";
/*eslint-disable */

const User = require('../model/user');
const Message = require('../model/messages');
const MessageRoom = require('../model/messageRoom');
const responseInfo = require('../model/responseInfo');
const { ObjectId } = require('mongodb');

exports.createMessageRoom = async (req, res, next) => {
    const receiver = req.body.receiver;
    const sender = req.body.sender;
    const messageId = req.body.messageId
    const newMessageRoom = new MessageRoom({
        participants: [sender, receiver],
        messages: [messageId]
    });
    try {
        await newMessageRoom.save();
        res.status(201).json(new responseInfo(false, null, newMessageRoom));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "create a new message room failed", null));
    }
}

exports.sendMessage = async (req, res, next) => {
    const receiver = await User.findOne({ email: req.body.receiver })
    const newMessage = new Message({
        sender: new ObjectId(req.body.sender),
        message: req.body.message,
        receiver: new ObjectId(receiver._id),
        timeSent: Date.now()
    })
    try {
        await newMessage.save();
        const messageRoom = await MessageRoom.findOne({ participants: { $all: [receiver, sender] } });
        if (messageRoom) {
            messageRoom.update({ $push: { messages: newMessage._id } });
        } else {
            const response = await fetch('http://localhost:8080/prepair/createRoom', {
                method: 'Post',
                body: JSON.stringify({
                    receiver,
                    sender,
                    messageId: newMessage._id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = response.json();
            console.log(result);
        }
        res.status(201).json(new responseInfo(false, null, newMessage));
    } catch (error) {
        res.status(500).json(new responseInfo(true, "Creating a new message failed", null));
    }
}

// exports.getAllMessages = async (req, res, next) => {

// }