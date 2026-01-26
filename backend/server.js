const mongoose =require("mongoose");
const dotenv=require("dotenv");
dotenv.config({path:"./config.env"});
const app=require("./app");
//const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
// const DB=process.env.DB_URL;
// mongoose.connect(DB).then(()=>{
//     console.log("DB connection successful");
// }).catch((err)=>{
//     console.log(err);
// })
process.on('uncaughtException',err=>{
    console.log('UNCAUGHT EXCEPTION!  Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

mongoose.connect(process.env.DATABASE)
.then(() => console.log("Connected to local MongoDB"))
.catch(err => console.log(err));

const port=process.env.PORT;
app.listen(port,()=>{
    console.log("app running on port "+port);
});
process.on('unhandledRejection',err=>{
    console.log('UNHANDLED REJECTION!  Shutting down...');
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    });
});