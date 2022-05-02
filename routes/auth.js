const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();


// routes get pages.

router.post('/signup', authController.signup);
router.post('/login', authController.login);



module.exports = router;