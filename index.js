const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const port = 8050;

// Routes

const user_route = require("./routes/userRoute");
app.use("/", user_route);


// url running
app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
});

