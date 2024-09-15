// create a middleware called auth that verifies if a user is logged in and ends the request early if the user isn't logged in

const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const JWT_SECRET = "randomilovekiara";
const app = express();

// Middlewares
app.use(cors()); // For allowing CORS
app.use(express.json()); // For parsing JSON bodies

let user = [];

// /signup route
app.post("/signup", function(req, res) {
    const uname = req.body.username;
    const psswd = req.body.password;

    if (user.find(u => u.username === uname)) {
        return res.json({
            message: "Username already taken"
        });
    }

    // Add new user to the array
    user.push({
        username: uname,
        password: psswd
    });

    // Send success message
    res.json({
        message: "User created for username: " + uname
    });
});

// /sign_in route
app.post("/sign_in", function(req, res) {
    const uname = req.body.username;
    const psswd = req.body.password;

    // Find user by username
    const existingUser = user.find(u => u.username === uname && u.password === psswd);
    if (existingUser) {
        // Create a JWT token with username
        let token = jwt.sign({
            username: uname
        }, JWT_SECRET);

        // Send the response with token
        res.json({
            message: "You are signed in as: " + uname,
            token: token
        });
    } else {
        res.status(403).send({
            message: "No such user present or invalid password"
        });
    }
});

function auth(req,res,next){
    const token = req.headers.token;
    const decodedUsername = jwt.verify(token,JWT_SECRET);
    if(user.find(u => u.username==decodedUsername)){
        req.username = decodedUsername.username;
        next();
    }else{
        res.status(403).send({
            message : "invalid token"
        })
    }
}

// /me route to get user details
app.get("/me", auth,function(req, res) {
    const currUser = req.username;
    res.json({
        username : currUser.username
        // password : req.password
    })
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
