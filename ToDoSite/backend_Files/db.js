const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/to_do_databse");

const userData = new Schema({
    username : String,
    password : String
})

const todoData = new Schema({
    title : String,
    userId : ObjectId
})

// now use these collection var. and connect them to actual collection names in DB.
const userModel = mongoose.model("userdbs",userData);
const todoModel = mongoose.model("tododbs",todoData);

// export 
module.exports = {
    userModel,
    todoModel
}