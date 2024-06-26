

const mongoose = require('mongoose');

// Define the user Schema
const userSchema = new mongoose.Schema({

    name:{type:String, require:true},
    email:{type:String, required:true, unique: true},         //Primary Key
    password:{type:String, required:true},
    date:{type:Date, default:Date.now}

});

const User = mongoose.model('User',userSchema);
module.exports = User;