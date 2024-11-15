const { Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "randomilovekiara";


const userRouter = Router();

const {userModel , purchaseModel} = require("../database");

// now instead of writing app.post /app.get we would pick userRouter.get/userRouter.post

userRouter.post("/signup",async function(req,res){
    try {
        const { firstName, lastName, email, password} = req.body;
        // store hashed pass into db

        const hashedPassword = await bcrypt.hash(password,5);
        await userModel.insertMany({
            firstName,
            lastName,
            email,
            password : hashedPassword
        })

        res.json({
            message : "successfull sign-up"
        })

    } catch (error) {
        console.error("error during sign-up : " +error);
        res.json({
            message : "signup failed",
            error : error.message
        })
    }

})

userRouter.post("/signin",async function(req,res){
    try {
        const {email , password} = req.body;
        const user = await userModel.findOne({email : email});
        if(!user){
            return res.status(400).json({
                message : "no such email found"
            })
        }
        const validatePassword = await bcrypt.compare(password,user.password);
        if(!validatePassword){
            return res.status(400).json({
                message : " wrong password" 
            })
        }

    } catch (error) {
        console.error("error during sign-in :"+error);
        res.json({
            message : "signin failed",
            error : error.message
        })
    }
})

userRouter.get("/my-courses",function(req,res){
    
})


module.exports = {
    userRouter : userRouter
}