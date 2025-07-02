import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";
import {CreateUserSchema , SigninSchema, CreateRoomSchema} from "@repo/common/types";

const app = express();

app.post("/api/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    // verify username from the Database /
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Incorrect input"
        })
        return;
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