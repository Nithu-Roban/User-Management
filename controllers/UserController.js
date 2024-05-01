// requiring models 
const User=require('../models/userModel')










// initial loading of registration page
const loadRegister = async(req,res)=>{
    try{
        res.render('Register');
    }catch(error){
        console.log(error.message);
    }
}


// initial loading of otp 

const loadOtpVerification = async(req,res)=>{
    try{
            res.render('otp');
    }catch(error){
        console.log(error.message);
    }
}






// Verifying registration of user
const loadVerifyRegister = async(req,res)=>{
    try{


        
        const {uname,email,pass} = req.body;

        // copying data onto session
        req.session.uname = uname;
        req.session.email = email;
        req.session.pass = pass;
        
        // console.log("req.body:",req.body)
        


        if(validatePassword(pass)){

            // checks for already existing user
            const existingUser = await User.findOne({email:email});
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
            console.log(userData)
            console.log('user details are saved successfully');
            res.redirect('/');

        }
        else {
            

            req.flash('error', 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.');
            return res.redirect('/');

            // const errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.';
            // return res.status(400).json({ error: errorMessage });
        }
    }
    catch(error){
        console.log(error.message);
    }
}

// function to check the validity
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/;
function validatePassword(password){
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
    loadOtpVerification,
    loadVerifyRegister,



    loadLogin
    
}