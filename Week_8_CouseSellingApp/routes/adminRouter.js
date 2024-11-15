const { Router } = require("express");

//connecting adminModel db w/ it.
const {adminModel} = require("../database");

// assign Router to current file
const adminRouter = Router();

adminRouter.post("/signup",function(req,res){

})

adminRouter.post("/signin",function(req,res){

})

adminRouter.post("/course",function(req,res){

})

adminRouter.put("/course",function(req,res){

})

adminRouter.get("/course/bulk",function(req,res){

})

module.exports = {
    adminRouter : adminRouter
}