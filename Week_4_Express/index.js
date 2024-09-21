const express = require('express');
const app = express();

// route handler
app.get('/',function(req,res){   // express u have to define the CRUD Method u gona use and inside , u have to pass route and functional function as an arguments in which you handle the req and resp and gives required resp. 
    res.send('Hello Harsh');
})



// assignment -> I am given a url in which there are a & b declared having some values . I have to take those query paramters a and b and also perform the required task mentioned in the url itself. 

app.get('/sum',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer: a+b
    })
})

app.get('/multiply',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        answer : a*b
    })
})

app.listen(3000); //which port
