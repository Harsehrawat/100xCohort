import mongoose, { Mongoose, Types, Document } from "mongoose";
import { model, Schema } from "mongoose";
import { string } from "zod";
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/second-brain");

export interface IUser extends Document{
    username : string,
    password : string
}

const UserSchema = new Schema<IUser>({
    username : {type : String, unique : true},
    password : String
});

const ContentSchema = new Schema({
    title : String,
    link : String,
    tags : [{ 
        type: mongoose.Types.ObjectId,
        ref : 'user'
     }],
    userId : [{
        type : mongoose.Types.ObjectId ,
        ref : 'user',
        require : true
    }]
})


export const UserModel = model("user",UserSchema);
export const ContentModel = model("content", ContentSchema);
