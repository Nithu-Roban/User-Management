// requiring models 
const User = require('../models/userModel');










// initial loading of registration page
const loadRegister = async(req,res)=>{
    try{
        res.render('Register');
    }catch(error){
        console.log(error.message);
    }
}


// Verifying registration of user
const loadVerifyRegister = async(req,res)=>{
    try{
        const {uname} = req.body.uname;
        // console.log(uname)
        const {email,pass} = req.body;
        if(validatePassword(pass)){

            // checks for already existing user
            const existingUser = await User.find({email:email});
            if(existingUser){
                return res.status(400).json({message:" User with this email already exists!!!"});
            }

            // if is a new user, adding the details into the schema
            const userData = new User({
                name:uname,
                email:email,
                password:pass

            });
            await userData.save();
            console.log('user details are saved successfully');
            res.redirect('/');

        }

    }catch(error){
        console.log(error.message);
    }
}

// function to check the validity
function validatePassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
    return passwordRegex.test(password);
}



// initial loading of login page
const loadLogin = async(req,res)=>{
    try{
        res.render("login");
    }catch(error){
        console.log(error.message);
    }
}





module.exports={

    loadRegister,
    loadVerifyRegister,



    loadLogin
    
}