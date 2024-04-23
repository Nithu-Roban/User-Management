const express = require('express');
const path = require('path');
const user_route = express();

user_route.set('view engine', 'ejs');
user_route.set('views',"./views/users");


const userController = require('../controllers/UserController');

user_route.get('/',userController.loadLogin);
user_route.get('/register', userController.loadRegister);


module.exports = user_route;