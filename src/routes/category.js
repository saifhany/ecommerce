const express = require('express');
const {addCategory,getCategories} = require('../controller/category');
const {requireSignin,adminMiddleware} = require('../common-middleware');
const router = express.Router();

router.post('/category/create',requireSignin  , adminMiddleware,addCategory);
router.get('/category/getCategory',getCategories);

module.exports =router;