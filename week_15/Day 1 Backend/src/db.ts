import mongoose from "mongoose";
import { model, Schema } from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/second-brain");

const UserSchema = new Schema({
    username : {type : String, unique : true},
    password : String
});

export const UserModel = model("user",UserSchema);

