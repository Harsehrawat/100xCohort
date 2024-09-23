// here will create and declare schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/to_do_databse");
// now create Top level obj. that will be called to put/access data var.

const User = new Schema({
    username : String,
    password : String
})

const todo = new Schema({
    title : String,
    userId : ObjectId

})

// now need to create a model of this obj. which will be  assigned to respective collection in actual db.
const userModel = mongoose.model("userdbs",User);
const todoModel = mongoose.model("tododbs",todo);


// also these should be available to server / BE for accessibilty 
module.exports = {
    userModel : userModel,
    todoModel : todoModel
}