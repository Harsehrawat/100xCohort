const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/courseSellingApp");

const userSchema = new Schema({
    email : {type : String, unique : true},
    firstName : String,
    lastName : String,
    password : String
})

const adminSchema = new Schema({
    email : {type : String, unique : true},
    firstName : String,
    lastName : String,
    password : String
})

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    creatorId : ObjectId,
    imageUrl : String
})

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
})

const userModel = mongoose.Model("user",userSchema);
const adminModel = mongoose.Model("admin",adminSchema);
const courseModel = mongoose.Model("course",courseSchema);
const purchaseModel = mongoose.Model("purchase",purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
