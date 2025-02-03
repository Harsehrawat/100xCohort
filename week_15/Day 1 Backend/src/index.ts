import express from "express";
import mongoose  from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { UserModel } from "./db";
import { z } from "zod";
import { Request, Response } from "express";

const app = express();
app.use(express.json());

// Zod schema for validation
const signUpSchema = z.object({
    username : z.string().min(3).max(10),
    password : z.string().min(7).max(15).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[@,?,!,$,%,&,*]/)
});

app.post("/api/signup", async (req: Request, res: Response): Promise<any> => {
    try {
      const { username, password } = signUpSchema.parse(req.body);
  
      // Check if user already exists
      const ifUserExists = await UserModel.findOne({ username });
      if (ifUserExists) {
        return res.status(403).json({
          message: "Username already taken"
        });
      }
  
      // Hash password and create user
      const hashedPass = await bcrypt.hash(password, 5);
      await UserModel.create({
        username,
        password: hashedPass
      });
  
      res.status(200).json({
        message: "Signup successful"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(411).json({
          message: "Invalid input"
        });
      }
      console.log("Server error", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });
  

app.post("/api/signin" , (req,res)=>{

} );

app.post("/api/post/content", (req,res)=>{

});

app.get("/api/get/content", (req,res)=>{

});

app.delete("/api/delete/content", (req,res)=>{

});


app.listen(3000);