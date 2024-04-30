const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');



const app = express();
const port = 8050;

// Database Connection establishment
const mongoose=require("mongoose")
const uri = "mongodb+srv://nithuroban453:123@cluster0.trjkrqs.mongodb.net/"
mongoose.connect(uri);

// Middleware to parse URL-encoded bodies with extended options
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(flash());





// Routes
const user_route = require("./routes/userRoute");
app.use("/", user_route);


// url running
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
});

