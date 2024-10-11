const express = require("express");
const Router = express.Router();

// assign Router to current routingFile
const courseRouter = Router();

courseRouter.get("/purchase",function(req,res){

})

courseRouter.get("/preview",function(req,res){
    
})

module.exports = {
    courseRouter : courseRouter
}