const express = require('express');
const{
    getAllCompanies
    } = require('../controllers/companyController');
const {createStory} = require('../controllers/reviewController');
const router = express.Router();
router.get('/all',getAllCompanies);
router.post('/create',createStory);
module.exports = router;