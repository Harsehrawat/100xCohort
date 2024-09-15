const express = require('express');
const app = express();

app.use(express.json()); // This is necessary to parse JSON request bodies

app.post('/addList',function(req,res){
    const data = req.body.data;
    

    //send the updated list
    res.json({
        data
    })
})

app.listen(3000);