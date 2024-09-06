// Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const express = require('express');
const app = express();

function logMethod(req,res,next){
    console.log("Method of request is : "+ req.method);

    next();
}
function logURL(req,res,next){
    console.log("URL of current request is : "+req.originalUrl);

    next();
}
function logTimeStamp(req,res){
    console.log("current timestamp is : "+Date().toString());
}

app.get('/assignment', logMethod, logURL, logTimeStamp, (req, res) => {
    res.send("Middleware logging complete!");
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});