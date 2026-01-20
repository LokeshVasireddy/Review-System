const mongoose=require('mongoose');
const compaySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Company name is required'],
        unique:true,
        trim:true,
    },
    positiveCount:{
        type:Number,
        default:0,
    },
    negativeCount:{
        type:Number,
        default:0,
    },
    neutralCount:{
        type:Number,
        default:0,
    },
    totalReviews:{
        type:Number,
        default:0,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'story',
        }
    ],
},{ timestamps:true}
);
const Company=mongoose.model('Company',compaySchema);
module.exports=Company;