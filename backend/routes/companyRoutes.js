const express = require('express');
const{
    getAllCompanies,
    getAllCompaniesTotalStats,
    getAllCompaniesStats,
    getCompanyById
    } = require('../controllers/companyController');


const router = express.Router();
router.get('/all',getAllCompanies);
router.get('/total-stats',getAllCompaniesTotalStats);
router.get('/stats',getAllCompaniesStats);
router.get('/:id',getCompanyById);

module.exports = router;