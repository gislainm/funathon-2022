"use strict";
/*eslint-disable */
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

module.exports = router;