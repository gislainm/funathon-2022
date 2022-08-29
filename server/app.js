"use strict";
/*eslint-disable */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const messageRouter = require("./routes/messageRouter");
const responseInfo = require('./model/responseInfo');
const { response } = require('express');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/prepair', userRouter);
// app.use('/prepair', messageRouter);

app.use((req, res, next) => {
    res.status(4040).json(new responseInfo(true, "Page Not Found", null));
});

app.use((err, req, res, next) => {
    res.status(500).json(new responseInfo(true, err.message, null));
});

mongoose.connect('mongodb://localhost:27017/PrePairDB')
    .then(()=>{
        app.listen(8080, ()=>{console.log('welcome to Pre-Pair')})
    })