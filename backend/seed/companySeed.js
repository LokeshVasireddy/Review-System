const mongoose=require('mongoose');
const dotenv=require('dotenv');
//const app=require("../app.js");
const Company=require("../model/companyModel.js");

dotenv.config({ path: "../config.env" });


mongoose.connect(process.env.DATABASE)
.then(() => console.log("Connected to local MongoDB"))
.catch(err => console.log(err));

const banks = [
  "JPMorgan Chase",
  "Bank of America",
  "Wells Fargo",
  "Citibank",
  "Goldman Sachs",
  "Morgan Stanley",
  "HSBC",
  "Barclays",
  "Standard Chartered",
  "Deutsche Bank",
  "BNP Paribas",
  "Credit Suisse",
  "UBS",
  "Santander",
  "ING",
  "Royal Bank of Canada",
  "Toronto-Dominion Bank",
  "Scotiabank",
  "Bank of Montreal",
  "ICICI Bank",
  "HDFC Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Yes Bank"
];
const addCompanies=async()=>{
    try{
        await Company.deleteMany();
        const formatted=banks.map((name)=>({
            name:name.trim(),
            totalReviews:0,
            positveCount:0,
            negativeCount:0,
            neutralReviews:0,
            reviews:[]
        }));
        await Company.insertMany(formatted);
        console.log("Companies added successfully");
        mongoose.connection.close();
    }catch(err){
        console.log(err);
        process.exit(1)
    }
};
const deleteCompanies=async()=>{
    try{
        await Company.deleteMany();
        console.log("Companies deleted successfully");
        mongoose.connection.close();
    }catch(err){
        console.log(err);
        process.exit(1)
    }
};
const run=async()=>{
    const arg=process.argv[2];
    if(arg==="--delete"){
        await deleteCompanies();
    }
    else if(arg==="--add"){
        await addCompanies();
    }
    else{
        console.log("Invalid argument. Use --add to add companies or --delete to delete companies.");
        process.exit(1);
    }
};
run();
module.exports=Company;

