// more optimal way to write so is to call all the middleware and the next routing fn in a common router as arguments .
// Also here , do not process further if the calls made reaches 5 .

const express = require("express");
const app = express();

let counter = 0;

function requestCounter(req,res,next){
    counter++;
    console.log("request made till here : "+counter);

    // move to next or stop .
    if(counter<=5){
        next(); // move to the next middleware called in app.get fn.
    }
    else{
        res.send('You are prohibited of this service now !');
        return;  // stop further processing.
    }
}

function sumCounter(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    //o/p->
    res.json({
        sum : a+b
    })
}

app.get('/sum',requestCounter,sumCounter);

app.listen(3000);