const express = require('express');
const path = require('path');
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views',"./views/users");


const userController = require('../controllers/UserController');

// registration routes
user_route.get('/register', userController.loadRegister);
user_route.post('/verifyRegister',userController.loadVerifyRegister);


// login routes
user_route.get('/',userController.loadLogin);

module.exports = user_route;