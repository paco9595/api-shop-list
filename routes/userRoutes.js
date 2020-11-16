const express = require('express')
const router = express.Router();
const { googleAuth, facebookAuth } = require('./../controllers/userController');


router.post('/auth/google', googleAuth);
router.post('/auth/facebook', facebookAuth);


module.exports = router;