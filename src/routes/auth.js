const express = require('express');
const { signup ,signin  } = require('../controller/auth');
const {validatesignupRequest ,validatesigninRequest  , isRequestValidated} = require('../validators/auth');
const router = express.Router();

router.post('/signup',validatesignupRequest ,isRequestValidated ,signup );

router.post('/signin', validatesigninRequest,isRequestValidated , signin);


module.exports = router;