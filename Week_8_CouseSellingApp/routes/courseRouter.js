const { Router } = require("express"); // Import Router from express
const { courseModel } = require("../database");

const courseRouter = Router(); // Create a Router instance

// Define routes
courseRouter.get("/purchase", function (req, res) {
    res.json({ message: "Course purchase endpoint" });
});

courseRouter.get("/preview", function (req, res) {
    res.json({ message: "Course preview endpoint" });
});

module.exports = {
    courseRouter : courseRouter // Export the Router instance
};
