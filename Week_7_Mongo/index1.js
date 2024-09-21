// in it , we'ill try creating back-end for todoApp using mongoDB
const express = require("express");
const app = express();
const jwt  = require("jsonwebtoken");
const JWT_SECRET_KEY = "randomilovekiara";
app.use(express.json());

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
            message : "this username is already taken"
        })
    }else{
        await UserModel.insertMany({
            username : username,
            password : password
        })
        // send verifying message
        res.json({
            message : " user created "
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
        password : password
    })

    if(findUser){
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
        res.status(403).send({
            message : "Invalid Credentials"
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
    userId : userId
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

app.listen(3000);