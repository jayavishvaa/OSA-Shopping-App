const express = require("express");
const mongoose = require("mongoose");
const logger = require('morgan');
const config = require("config");
const passport = require('passport');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const authRouter = require('./routes/auth');
const registerRouter = require('./routes/register');
const shopsRouter = require('./routes/shops');

const app=express();

app.use(logger('dev'));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/shops', shopsRouter);

mongoose.connect(config.get("mongodbUrl"), { useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>console.log('mongo connected..'))
        .catch(err=>{console.log(err)});

const port=process.env.PORT || 8000;
app.listen(port,()=>console.log(`server started on port ${port}`));