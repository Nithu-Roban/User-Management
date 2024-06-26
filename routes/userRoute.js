const express = require('express');
const path = require('path');
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views',"./views/users");


const userController = require('../controllers/UserController');

// registration routes
user_route.get('/register', userController.loadRegister);
user_route.get('/otp', userController.loadOtpVerification)
user_route.post('/verifyRegister',userController.loadVerifyRegister);


// login routes
user_route.get('/',userController.loadLogin);
user_route.post('/verifyLogin', userController.loadVerifyLogin);
user_route.get('/sendOtp', userController.loadSendOtp);
user_route.post('/verify_otp',userController.verifyOtp)

module.exports = user_route;