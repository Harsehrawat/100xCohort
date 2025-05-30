const express = require("express");
const cors = require("cors");

const app = express();

//fn to do sum with post method.
app.use(express.json());
app.use(cors());
app.post('/sum',function(req,res){
    // fetch a and b
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    //o/p->
    res.json({
        answer : a+b
    })
})

app.listen(3000);