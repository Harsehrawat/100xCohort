const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/courseSellingApp");

// Define schemas
const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});


const adminSchema = new Schema({
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    creatorId: ObjectId,
    imageUrl: String
})

const purchaseSchema = new Schema({
    userId: {type : ObjectId, ref : "User"},
    courseId: {type : ObjectId , ref : "Course"}
})

// Create models
const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("Purchase", purchaseSchema);

// Export models
module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};
