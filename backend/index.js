const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const passport = require('passport');

var usersRouter = require('./routes/users');

const app=express();

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);

mongoose.connect(config.get("mongoUrl"))
        .then(()=>console.log('mongo connected..'))
        .catch(err=>{console.log(err)});

const port=process.env.PORT || 8000;
app.listen(port,()=>console.log(`server started on port ${port}`));