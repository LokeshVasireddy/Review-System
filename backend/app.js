const express = require('express');
const heLmet=  require('helmet');
const cors=require('cors');
const morgon=require('morgan');
const rateLimit=require('express-rate-limit');
const mongosnatize=require('express-mongo-sanitize');
const { mongo } = require('mongoose');
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
if(process.env.NODE_ENV==='development'){
    app.use(morgon('dev'));
    app.use(mongosnatize());
}
app.use(express.json({limit:'10kb'}));
app.use((req,res,next)=>{
    mongosnatize.sanitize   (req.body);
    mongosnatize.sanitize(req.params);
    const querycopy={...req.query};
    mongosnatize.sanitize(querycopy);
    req.query = mongoSanitize.sanitize(querycopy);
    
    next();
});
app.get('/',(req,res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to the API',
    });
});
app.use((req,res,next)=>{
    next(new Error(`Can't find ${req.originalUrl} on this server!`));  
});
app.use(globalErrorHandler);

module.exports=app;