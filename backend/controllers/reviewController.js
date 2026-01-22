const catchAsync = require('../utils/catchAsync');
const Story = require('../model/reviewModel');
const AppError = require('../utils/appError'); 
const Company = require('../model/companyModel');
const crypto = require('crypto');
function generateAnonymousId() {
    return 'anon-' + crypto.randomBytes(3).toString('hex');
}   

exports.getAllReviews = catchAsync(async (req, res, next) => {
    // Implementation for getting all reviews
    const{
        companyName="",
        vibe= "",
        search='',
        sort="newest",
        page=1,
        limit=6,
    }=req.query;

    //create a filter object based on query parameters
    const filter={};
    if(companyName){
        filter.companyName={$regex:companyName,$options:'i'};
    }
    if(vibe){
        filter.vibe=vibe;
    }
    if(search){
        filter.title={ $regex:search,$options:'i'};
    }
    const sortOption =sort=== "oldest" ? "createdAt" : "-createdAt";

    const pageNumber=parseInt(page);
    const limitNumber=parseInt(limit);
    const skip=(pageNumber-1)*limitNumber;

    const [reviews,total]=await Promise.all([
        Story.find(filter).sort(sortOption).skip(skip).limit(limitNumber),
        Story.countDocuments(filter),
    ]);
    res.status(200).json({
        status:'success',
        results:reviews.length,
        total,
        page: Number(pageNumber),
        totalPages:Math.ceil(total/limitNumber),
        count:reviews.length,
        data:{
            reviews,
        },
    });

});

exports.createStory=catchAsync(async(req,res,next)=>{
    const{
        vibe,
        companyName,
        isAnonymous,
        name,
        anonymousId,
        userType,
        title,
        story,
    }=req.body;
    if(isAnonymous && !anonymousId){
        return next(new AppError('Anonymous ID is required for anonymous reviews',400));
    }    
    const company=await Company.findOne({name:companyName.trim()});
    if(!company){
        return next(new AppError('Company not found',400));
    }
    const newStory=await Story.create({
        vibe,
        companyName:company.trim(),
        isAnonymous,
        name: isAnonymous ? undefined : name,
        anonymousId: isAnonymous ? generateAnonymousId() : undefined,
        userType,
        title,
        story,
    });
    const update={
        $push:{reviews:newStory._id},
        $inc:{totalReviews:1},
    };
    if(vibe==='positive'){ 
        update.$inc.positiveCount=1;
    }
    if(vibe==='negative'){
        update.$inc.negativeCount=1;
    }
    if(vibe==='neutral'){
        update.$inc.neutralCount=1;
    }  
    await Company.findByIdAndUpdate(company._id,update);
    res.status(201).json({
        status:'success',
        message:'Review created successfully',
        data:{
            review:newStory,
        },
    });   

});  
