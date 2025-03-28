import express from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

// import from other files
import { UserModel } from "./db";
import {ContentModel} from "./db";
import { LinkModel } from "./db";
import { random } from "./utils";
import { string, z } from "zod";
import { Request, Response } from "express";
import { JWT_SECRET_KEY } from "./config";
import cors from "cors";
import { userMiddleware } from "./middleware";
import helmet from "helmet";


const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies.
app.use(cors()); // Middleware to allow cross-origin requests.
app.use(helmet({  // helment to prevent DDOS and frame Attacks 
  contentSecurityPolicy : false,
  frameguard : {action : "deny"}
}));

// Zod schema for validation
const Joi = require("joi");

const inputValidation = Joi.object({
  username: Joi
    .string()
    .min(3)
    .max(15)
    .pattern(/^[a-z0-9]+$/)
    .messages({
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username can't be longer than 15 characters",
      "string.pattern.base": "Username can only contain lowercase letters and numbers"
    })
    .required(),

  password: Joi
    .string()
    .min(5)
    .max(15)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$&]).*$/) 
    .messages({
      "string.min": "Password must be at least 5 characters long",
      "string.max": "Password can't be longer than 15 characters",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, $, &)"
    })
    .required()
});


app.post("/api/signup", async (req: Request, res: Response): Promise<any> => {

  const {error} = inputValidation.validate(req.body);
  if(error){
    return res.status(403).json({message : error.details[0].message});
  }
  
    try{
      console.log("inside /api/signup");
      const {username , password} = req.body;
      console.log("searching for :" +req.body.username + " ,password :"+req.body.password);
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
    } 
    catch (error) {
      console.log("Server error at /signup BE :", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });
  

  app.post("/api/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const verifyUsername = await UserModel.findOne({ username });

        // If user exists
        if (verifyUsername) {
            // Compare the provided password with the stored hashed password
            const verifyPass = await bcrypt.compare(password, verifyUsername.password);

            // If passwords match,generate a JWT token and send it back
            if (verifyPass) { 
                const token = jwt.sign({ id: verifyUsername._id }, JWT_SECRET_KEY);
                res.status(200).json({ token,message : "Login Successfull" });
            } else {
                res.status(403).json({ message: "Incorrect password" });
            }
        } else {
            res.status(403).json({ message: "Username not found" });
        }
    } catch (error) {
        console.log("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

    

app.post("/api/content",userMiddleware ,async (req, res)=>{
    const {title , link, type} = req.body;
    try{
      if(title==null || link===null || type===null){
        res.status(400).json({message : "can't submit null entry"});
      }
      else{
        await ContentModel.create({
          title,
          link,
          type,
          userId : req.userId,
          tags : [],
        })
        res.status(200).json({ message : "Content Added!"});
      }
    }catch(e){
      console.log("server error in app.post(/api/content)"+e);
      res.status(500).json({message : "server error"});
    }
    
})


app.get("/api/content/:type",userMiddleware, async (req,res)=>{
    const userId = req.userId;
    const {type} = req.params;
    // from contentModel return content w/ this userId
    try{
        // fetch username to always display regardless if any content added or not
        const user = await UserModel.findOne({ _id : userId}).select("username");
        const content = await ContentModel.find({ userId : userId}).populate("userId","username");
        const contentType = content.filter( (i) => i.type === type);
        if(content.length !=0){
            res.status(200).json({ contentType ,username  : user?.username});
        }
        else{
            res.status(200).json({ message : "you have added nothing yet" , username : user?.username});
        }
    }
    catch(e){
        console.log("server error "+e);
    }
});

app.delete("/api/delete/content/:contentId", userMiddleware,async (req,res)=>{
    const {contentId} = req.params;
    // find and return 
    try{
        await ContentModel.deleteMany({
            _id : contentId,
        })
        res.status(200).json({message : "deleted successfully"});
        
    }
    catch(e){
        console.log("server eror in content delete"+e);
        res.status(403).json({message : e});
    }
});

app.post("/api/share/content",userMiddleware , async (req,res)=>{
    const share = req.body.share;
    try{
      if(share){
        const existingLink = LinkModel.findOne({ userId : req.userId});
        if(!existingLink){
          // create new and return
          const hash = random(10);
          await LinkModel.create({ userId : req.userId , hash});
          res.status(200).json({ message : `/api/share/${hash}`});
        }else{
          // delete existing link and return new to user and db
          await LinkModel.deleteOne({ userId : req.userId});
          const hash = random(10);
          await LinkModel.create({ userId : req.userId ,hash});
          res.status(200).json({ message : `/api/share/${hash}`});
        }
      }else{
        await LinkModel.deleteOne({ userId : req.userId});
        res.status(200).json({ message : "link deleted"});
      }      
    }catch(e){
      console.log("error in /api/share/content :"+ e);
      res.status(403).json({message : "server error"});
    }
});

app.get("/api/share/:sharableLink", async (req,res)=>{
    const hash = req.params.sharableLink;
    // verify hash is associated w/ LinkModel
    const link = await LinkModel.findOne({ hash });
    if(!link){
      res.status(411).json({ message : "invalid link / no such link exists"});
      return;
    }
    // if such link found , return content and username
    const content = await ContentModel.find({ userId : link.userId});
    // fetching userDetails from UserModel
    const user = await UserModel.findOne({_id : link.userId});
    const username = user?.username;
    if(!content){
      res.status(404).json({message : "empty link / no content added by user associated w/ this link" , username});
    }
    // if content found , return content and username

    res.status(200).json({ username,content});

})


app.listen(3000);