"use strict";
/*eslint-disable */
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.get('/', userController.homepage);
router.post('/login', userController.login);
router.post('/signup', userController.signup);
router.post('/complete', userController.completeUserInfo)
// router.post('/update',userController.updateUserInfo)

module.exports = router;