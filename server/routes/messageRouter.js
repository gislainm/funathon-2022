"use strict";
/*eslint-disable */
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/sendMessage', messageController.sendMessage);
// router.post('/createRoom', messageController.createMessageRoom);

module.exports = router;