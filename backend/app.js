

const express = require('express');
const heLmet=  require('helmet');
const cors=require('cors');
const morgon=require('morgan');
const rateLimit=require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const globalErrorHandler=require('./controllers/errorController');
const AppError=require('./utils/appError');
const companyRouter=require('./routes/companyRoutes.js');
const { mongo } = require('mongoose');
const reviewRouter=require('./routes/reviewRoutes.js');
const app=express();

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    set() {
      throw new Error('req.query is being overwritten HERE');
    }
  });
  next();
});

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
    app.use(mongoSanitize());
}
app.use(express.json({limit:'10kb'}));
app.use((req, res, next) => {
  mongoSanitize.sanitize(req.body);
  mongoSanitize.sanitize(req.params);

  req.sanitizedQuery = { ...req.query };
  mongoSanitize.sanitize(req.sanitizedQuery);

  next();
});

app.use('/api/v1/companies',companyRouter);
app.use('/api/v1/reviews',reviewRouter);
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