const express = require('express');
const heLmet=  require('helmet');
const cors=require('cors');
const morgon=require('morgan');
const rateLimit=require('express-rate-limit');
const mongosnatize=require('express-mongo-sanitize');
const app=express();
app.use(heLmet());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
const limiter=rateLimit({
    max:10000,
    windowMs:60*60*1000,
    message:"Too many requests from this IP, please try again in an hour!",
    standardHeaders:true,
    legacyHeaders:false,
});
app.use('/api',limiter);

module.exports=app;