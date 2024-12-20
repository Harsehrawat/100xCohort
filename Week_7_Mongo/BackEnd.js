// in it , we'ill try creating back-end for todoApp using mongoDB
const mongoose = require("mongoose");
const path = require("path"); 
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const jwt  = require("jsonwebtoken");
const JWT_SECRET_KEY = "randomilovekiara";
app.use(express.json());
const cors = require("cors");
app.use(cors());  // Allow all domains, or configure specific domains

app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "signin_Login")));



// assign the exporting db model you want to import into this file
const { UserModel, todoModel} = require("./db");

app.post("/signup",async function(req,res){
    // fetch the data from FE
    const username = req.body.username;
    const password = req.body.password;

    // check if this username already exists , if not then pass this new username to DB
    const ifUsernameExists = await UserModel.findOne({
        username : username
    })
    if(ifUsernameExists){
        res.json({
            message : "This username already taken!"
        })
    }else{
        // hash the pass obtained using salting through bcrypt library and then store this hashed pass into db {bcrypt.hash would pass salt and hashed pass into one string to hashedPass var.}
        const hashedPass = await bcrypt.hash(password,5);

        await UserModel.insertMany({
            username : username,
            password : hashedPass
        })
        // send verifying message
        res.json({
            message : "User created successfully"
        })
    }

})

app.post("/signin",async function(req,res){
    // fetch data from FE
    const username = req.body.username;
    const password = req.body.password;
    // verify credentials if valid-> generate token 
    const findUser = await UserModel.findOne({
        username : username,
    })
    if(findUser){
        const matchPassword = await bcrypt.compare(password,findUser.password); // this fn will auto compare and return if this raw pass is matching the hashedPass without us explicitly fetching the salt and then generating using raw password to match
        if(matchPassword){
            //create jwt
            let token = jwt.sign({
                id : findUser._id.toString()
            },JWT_SECRET_KEY)
            // return token
            res.json({
                token : token
            })
        }
        else{
            res.json({
                message : "wrong password"
            })
        }
    }
    else{
        res.status(403).json({
            message : "wrong username"
        })
    }
})

app.post("/create_todos",auth,function(req,res){

    const userId = req.userId;
    const title = req.body.title;
    // pass userId and title to todo collection
    todoModel.create({
        userId,
        title
    })

    res.json({
        message : "Added to database"
    })
})

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET_KEY);
    if(decodedData){
        // assign the id to req that would be passed to next
        req.userId = decodedData.id;
        next();
    }
    else{
        res.status(403).json({
            message : "token not found"
        })
    }
}

app.get("/get_todos",auth, async function(req,res){
    // return all the todo's by using id
    const userId=  req.userId;
    const todos = await todoModel.find({
        userId : userId
    })
    // return todos
    res.json({
        todos
    })
})

app.delete("/delete_todos", auth, async function (req, res) {
    const userId = req.userId;
    const todoId = req.headers.id;

    // Validate todoId before converting it to ObjectId
    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({
            message: `Invalid todoId received: ${todoId}`
        });
    }

    try {
        const removeTodo = await todoModel.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(todoId), // Convert to ObjectId
            userId: userId
        });

        if (!removeTodo) {
            res.status(404).json({
                message: "Error deleting todo: task not found or unauthorized"
            });
        } else {
            res.json({
                message: "Task removed successfully"
            });
        }
    } catch (error) {
        console.error("Error while deleting todo:", error);
        res.status(500).json({
            message: "Error deleting todo"
        });
    }
});


// Serve the to-do HTML page
app.get("/todo", (req, res) => {
    res.sendFile(path.join(__dirname, "frontEnd.html"));
});

app.listen(3000);