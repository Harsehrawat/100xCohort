const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const userModel = require("./db");
const todoModel = require("./db");

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
    // fetch data from FE
    const username = req.body.username;
    const password = req.body.password;
    // verify using bcrypt
    const validateUser = await userModel.findOne({
        username : username
    })

    const verifyCred = bcrypt.compare(password,validateUser.password);
    if(verifyCred){
        // return a token and a success message
        let token = jwt.sign({
            id : validateUser._id.toString()
        }, JWT_SECRET);
        res.json({
            token : token
        })
    }
    else{
        res.status(203).send({
            message : "Invalid Credentials"
        })
    }
});


app.get("/me", function(req, res) {
    // Fetch token from headers
    const token = req.headers['token'];

    if (!token) {
        return res.status(400).send({
            message: "Token is required"
        });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        const username = decoded.username;

        // Find user by username
        const foundUser = user.find(u => u.username === username);

        if (foundUser) {
            res.json({
                username: foundUser.username,
                password: foundUser.password
            });
        } else {
            res.status(403).send({
                message: "Invalid Token"
            });
        }
    } catch (err) {
        res.status(403).send({
            message: "Invalid Token"
        });
    }
});

app.listen(3000);
