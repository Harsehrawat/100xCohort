const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();


app.use(express.static('public')); // Serve static files
app.use(cors());
app.use(express.json());

const JWT_SECRET = "randomilovekiara";

// global in-memory var.
let user = [];

app.post("/signin",function(req,res){
    // fetch the data from body
    const username = req.body.username;
    const password = req.body.password;

    // check uniqueness of username 
    if(user!=null){
        if(user.find(u=>u.username==username)){
            res.json({
                message : "username already taken"
            })
        }
    }
    //push to user arr and return response
    user.push({
        username : username,
        password : password
    });
    // return the response
    res.json({
        message : "signed-in successfully"
    })
})

app.post("/login", function(req, res) {
    // fetch the credentials
    const username = req.body.username;
    const password = req.body.password;

    // check if wrong password
    if (user.find(u => u.username == username && u.password != password)) {
        return res.status(403).send({
            message: "wrong password"
        });
    }

    // check if username not found
    if (!user.find(u => u.username == username)) {
        return res.status(403).send({
            message: "no such user found"
        });
    }

    // successful login, generate token
    if (user.find(u => u.username == username && u.password == password)) {
        let token = jwt.sign({
            username: username
        }, JWT_SECRET);

        return res.json({
            message: "you are logged-in successfully",
            token: token
        });
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
