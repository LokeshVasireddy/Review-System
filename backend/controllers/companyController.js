const Company = require('../models/companyModel');
const catchAsync = require('../utils/catchAsync'); 
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
