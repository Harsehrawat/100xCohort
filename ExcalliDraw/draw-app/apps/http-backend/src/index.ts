import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";
import {CreateUserSchema , SigninSchema, CreateRoomSchema} from "@repo/common/types";
import {prismaClient} from "@repo/db/client";

const app = express();

app.post("/api/signup",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    // verify username from the Database /
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message : "Incorrect input"
        })
        return;
    }
    
    try{
        await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: parsedData.data?.password,
                name: parsedData.data?.name
            }
        })
    }catch(e){
        res.status(411).json({
            message: "this username is already taken"
        })   
    }
    

})

app.post("/api/signin", (req,res)=>{
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Invalid Inputs"
        })
        return;
    }
})

function authMiddleware(){
    // get the token and verify the userAuthentication 


}

app.post("/api/create-room", authMiddleware, (req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "invalid room name"
        })
        return;
    }
})

app.listen(3001);