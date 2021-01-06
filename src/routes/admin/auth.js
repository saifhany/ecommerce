const express = require('express');
const { signup ,signin  } = require('../../controller/admin/auth');
const {validatesignupRequest ,validatesigninRequest  , isRequestValidated} = require('../../validators/auth');
const router = express.Router();
router.post('/admin/signup', validatesignupRequest , isRequestValidated, signup );
router.post('/admin/signin', validatesigninRequest , isRequestValidated,signin);


module.exports = router;