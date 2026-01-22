const moongoose = require('mongoose');
const { type } = require('os');
const storySchema = new moongoose.Schema({
    vibe:{String,
    enum:['positive','negative','neutral'],
    required:[true,'Vibe is required'],
    },
    companyName:{
        type:String,
        required:[true,'Company name is required'],
        trim:true,
    },
    isAnonymous:{
        type:Boolean,
        default:false,
    },
    name:{
        type:String,
        required:function(){
            return !this.isAnonymous;
        },
        trim:true,
    },
    anonymousId:{
        type:String,
        required:function(){
            return this.isAnonymous;
        },
        },
    userType:{
        enum:["individual customer","bank employee","bussiness customer","investor","other"],
        required:[true,'User type is required'],
    
    },
    title:{
        type:String,
        required:[true,'Title is required'],
        trim:true,
    },
    story:{
        type:String,
        required:[true,'Story is required'],
        trim:true,
    },
},{timestamps:true}
);
module.exports=moongoose.model('Story',storySchema);
