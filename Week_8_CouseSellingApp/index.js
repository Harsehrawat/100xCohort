const express = require("express");
const app = express();
app.use(express.json());

const {userRouter} = require("./routes/userRouter");
const {courseRouter} = require("./routes/courseRouter");
const {adminRouter} = require("./routes/adminRouter");
const { mongoose } = require("mongoose");

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main() {
    try {
        await mongoose.connect("mongodb+srv://harsehrawat:VGV4e7QDzTVzwiYt@cluster0.lgwkk.mongodb.net/courseSellingApp");
        console.log("Connected to MongoDB");
        app.listen(3000, () => console.log("Server is running on http://localhost:3000"));
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}


main();
