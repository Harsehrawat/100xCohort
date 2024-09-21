const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomilovekiara";
const app = express();

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
app.post("/signin", function(req, res) {
    const uname = req.body.username;
    const psswd = req.body.password;

    // Find user by username
    const existingUser = user.find(u => u.username === uname && u.password === psswd);
    if (existingUser) {
        // Create a JWT token with username
        let token = jwt.sign({
            uname
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

// /me route to get user details
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
        const uname = decoded.uname;

        // Find user by username
        const foundUser = user.find(u => u.username === uname);

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

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
