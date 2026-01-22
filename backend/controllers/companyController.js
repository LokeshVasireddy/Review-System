const Company = require('../model/companyModel.js');
const catchAsync = require('../utils/catchAsync'); 
const appErr = require('../utils/appError');
const AppError = require('../utils/appError');
exports.getAllCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find().sort({ name: 1 });
        res.status(200).json({
            status: 'success',
            results: companies.length,
            data: {
                companies,
            },
        });
    } catch (err) {
        next(err);
    }   
};

exports.getAllCompaniesTotalStats=catchAsync(async(req,res,next)=>{
    const companies=await Company.find();
    const totalComapnies=companies.length;
    const totalReviews=companies.reduce((acc,company)=>acc+company.totalReviews || 0,0);
    const totalComplaints=companies.reduce((acc,company)=>acc+company.negativeCount || 0,0);
    const averageComplaintRate= totalReviews===0 ? 0 : ((totalComplaints/totalReviews)*100).toFixed(2);
    const stats={
        totalComapnies,
        totalReviews,
        averageComplaintRate:Number(averageComplaintRate),
    };
    res.status(200).json({
        status:'success',
        data:{
            stats,
        },
    });
});


exports.getAllCompaniesStats =catchAsync(async(req,res,next)=>{
    const {sort,page=1,limit=10,search=''}=req.query;   
    const pageNumber=parseInt(page);
    const limitNumber=parseInt(limit);
    const skip=(pageNumber-1)*limitNumber;
    let allCompanies=await Company.find({
        name:{$regex:search,$options:'i'},
    }).lean();
    //calculate complaint rate manually
    allCompanies=allCompanies.map((company)=>{
        const {negativeCount,totalReviews}=company;
        const complaintRate=totalReviews===0 ? 0 : parseFloat(((negativeCount/totalReviews)*100).toFixed(2));
        return {
            ...company,
            complaintRate:Number(complaintRate),
        };
    });
    //sort based on query
    switch(sort){
        case 'reviews-asc':
            allCompanies.sort((a,b)=>a.totalReviews-b.totalReviews);
            break;
        case 'reviews-dsc':
            allCompanies.sort((a,b)=>b.totalReviews-a.totalReviews);
            break;
        case 'complaints-asc':
            allCompanies.sort((a,b)=>a.complaintRate-b.complaintRate);
            break;
        case 'complaints-dsc':
            allCompanies.sort((a,b)=>b.complaintRate-a.complaintRate);
            break;
        default:
            allCompanies.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
            break;
    }
    const totalCompanies=allCompanies.length;
    const pages=Math.ceil(totalCompanies/limitNumber);
    //paginate the results
    const paginatedCompanies=allCompanies.slice(skip,skip+limitNumber);
    res.status(200).json({
        status:'success',
        totalCompanies,
        totalpages,
        currentPage:pageNumber,
        count:paginatedCompanies.length,
        data:{
            companies:paginatedCompanies,
        },
    });
});            

exports.getCompanyById=catchAsync(async(req,res,next)=>{
    const {id}=req.params;
    const company=await Company.findById(id).populate({path:'reviews'}).lean();
    if(!company){
        return next(new AppError('No company found with that ID',404));
    }
    const {negativeCount,totalReviews}=company;
    const complaintRate=totalReviews===0 ? 0 : parseFloat(((negativeCount/totalReviews)*100).toFixed(2));
    company.companyWithStats={
        ...company,
        complaintRate,
    };
    res.status(200).json({
        status:'success',
        message:'Company details fetched successfully',
        data:{
            company: companyWithStats,
        },
    });

    
});