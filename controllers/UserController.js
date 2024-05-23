// requiring models 
const User = require('../models/userModel');
const nodemailer = require('nodemailer');









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
        
        console.log("req.session:",req.session)
        


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
            

            // req.flash('error', 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.');
            // return res.redirect('/');

            const errorMessage = 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long.';
            return res.status(400).json({ error: errorMessage });
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

// verify login page credentials

const loadVerifyLogin =  async(req,res)=>{
    try{
        const {email,pass}= req.body;
        const loginData = await User.findOne({email:email,password:pass});
        if(loginData){
            console.log("Login Success");
            res.redirect(`/sendOtp?${email}`);
        } else{
            return res.status(400).json({ error: "No Such user exist please retry!" });
        }


    }catch(error){
        console.log(error.message);
    }
}



const loadSendOtp = async(req,res)=>{
    try{
        const {email} = req.query;
        // const transporter = nodemailer.createTransport({
        //     service:'Gmail',
        //     auth:{
        //         user: 'nithuroban777@gmail.com',

        //         pass: 'Nithu@777'
        //     }


        // });
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'nithuroban777@gmail.com', // Replace with your email
                pass: 'Nithu@777' // Replace with your app password or email password
            }
        });
        const randomOtp = Math.floor(Math.random()*999999+1000).toString();
        req.session.otp = randomOtp;

        // Email options
        const mailOptions = {
            from: 'nithuroban777@gmail.com',
            to: email,
            subject :'Your OTP Verification Code',
            text: 'Hiii'
        };
        console.log(randomOtp);

        // send Email

        transporter.sendMail(mailOptions, (error,info) =>{
            if(error){
                console.log('Error sending email:',error); // error triggered need to resolve
                res.status(500).send('Error sending mail');
            } else{
                console.log('Email sent:',info.response);
                res.status(200).send('OTP Sent Successfully');
            }

        });

    }catch(error){
        console.log('Error in loadSendOtp:', error.message);
        res.status(500).send('Internal Server Error');
    }
}


module.exports={

    loadRegister,
    loadOtpVerification,
    loadVerifyRegister,



    loadLogin,
    loadVerifyLogin,
    loadSendOtp
    
}