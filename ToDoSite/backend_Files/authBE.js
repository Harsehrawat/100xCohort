const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const { userModel, todoModel } = require("./db");


app.use(express.static('public')); // Serve static files
app.use(cors());
app.use(express.json());

const JWT_SECRET = "randomilovekiara";

app.post("/signup",async function(req,res){
    // take data from FE
    const username = req.body.username;
    const password= req.body.password;
    // check if validUsername
    const validUsername =await userModel.findOne({
        username : username
    })
    if(validUsername){
        res.json({
            message : "username already taken"
        })
    }
    else{
        // use hashed salting using bcrypt library to store the passwords associated w/ users 
        const hashedPass = await bcrypt.hash(password,5);
        await userModel.insertMany({
            username : username,
            password : hashedPass,
        })
        res.json({
            message : "account created , now you can login"
        })
    }
})

app.post("/login",async function(req, res) {
    // fetch from FE
    const username  = req.body.username;
    const password=  req.body.password;
    // verify the username
    const verifyUser = await userModel.findOne({
        username : username
    })
    if(verifyUser){
        // check for password verify
        const verifyPassword = await bcrypt.compare(password,verifyUser.password);
        if(verifyPassword){
            // generate token 
            let token = jwt.sign({
                id : verifyUser._id.toString()
            },JWT_SECRET);
            res.json({
                token : token
            })
        }
        else{
            res.status(203).send({
                message : "wrong password"
            })
        }
    }
    else{
        res.status(203).send({
            message : "no such user found"
        })
    }
});


app.get("/todos",auth,async function(req, res) {
    // Fetch token from headers
    const userId = req.userId;
    const todos = await todoModel.find({
        userId : userId
    })
    const title = todos.map(todo=>todo.title);
    res.json({
        title
    })
});

function auth(req,res,next){
    const token = req.headers.token;
    const tokenPayload = jwt.verify(token,JWT_SECRET);
    if(tokenPayload){
        req.userId = tokenPayload.id;
        next();
    }
    else{
        res.status(403)
    }
}

app.post("/add_todos",auth,async function (req,res) {
    const userId = req.userId;
    const title = req.body.title;
    const addToDo = await todoModel.create({
        title,
        userId
    })
    res.json({
        message : "todo added successfully"
    })
})

app.post("/delete_todos",auth,async function (req,res) {
    const userId = req.userId;
    const todoId = userId._id.toString();
    await todoModel.findOneAndDelete({
        todoId : todoId
    })

})


app.listen(3000);
