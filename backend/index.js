const express = require("express")
const mongoose = require("mongoose")
const config = require("config")

const app=express();

app.use(express.json())
mongoose.connect('mongodb://localhost:27017/oneStop')
        .then(()=>console.log('mongo connected..'))
        .catch(err=>{console.log(err)})

const port=process.env.PORT || 8000;
app.listen(port,()=>console.log(`server started on port ${port}`))