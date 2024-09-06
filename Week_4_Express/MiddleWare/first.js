// I want to create a middleware which stops the router fn that counts the no of request made on our server .

const express = require("express");
const app = express();

let counter = 0;

function requestCounter(){
    counter++;
    console.log("requests made till here : "+counter);
}

// work on api end-points present in query paramters for sum and multiply of a and b.

app.get("/sum",function(req,res){
    requestCounter();

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    // output 
    res.json({
        answer : a+b
    })
})

app.get("/multiply",function(req,res){
    requestCounter();

    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    //o/p
    res.json({
        answer : a*b
    })
})

app.listen(3000); //which port
