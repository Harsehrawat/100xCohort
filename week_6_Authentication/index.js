const express = require('express');
const app = express();
app.use(express.json());


const user = [];

function generateToken(){
    let options = [];
    // fill options array with capital A-Z, small a-z and int from 0-9
    for(let i = 65;i<=90;i++){
        options.push(String.fromCharCode(i));
    }
    for(let i = 97;i<=122;i++){
        options.push(String.fromCharCode(i));
    }
    for(let i = 0;i<=9;i++){
        options.push(i);
    }

    // below is my way of generating random string for each token

    let token = "";
    for(let i = 0;i<30;i++){
        token += options[Math.floor(Math.random()*options.length)];
    }
    return token;

}

app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    // push these details into in-memory array
    user.push({
        username : username,
        password : password
    })

    res.json({
        message : "you are signed in"
    })
})

app.post("/signin",function(req,res){
    const username = req.body.username;


    // verify in in-memory var. user if these details exists.
    
    const verifyUser = user.find(function(u){    
        if(u.username == username){
            return true;
        }else{
            return false;
        }
    })

    // if this is a verifiedUser , we gota return a unique token to it otherwise deny the access
    if(verifyUser){
        const uniqueToken = generateToken();
        verifyUser.token = uniqueToken;   //verifyUser becomes object of user class when we wrote verifyUser = user.find().
        res.json({
            message : uniqueToken
        })
    }else{
        res.status(403).send({
            message : "User doesn't exist for these credantials"
        })
    }
    console.log(user);
})

// once logged-in , we would now onwards identify user based on his token , i.e. in further requests , he would be sending his token only rather than name and password again and again

app.get("/me",function(req,res){
    // fetch his token from headers param
    const token = req.header.token;
    // search if this token exists inside in-memory user.
    const foundUser = user.find(function(u){
        if(u.token == token){
            return true;
        }else{
            return false;
        }
    })

    if(foundUser){
        res.json({
            username : foundUser.username,
            password : foundUser.password
        })
    }else{
        res.json({
            message : "Token inValid"
        })
    }
})



app.listen(3000);