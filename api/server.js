// BUILD YOUR SERVER HERE
const { json } = require("express")
const express = require("express")

const server = express()
const db=require("./users/model")
server.get("/",(req,res)=>{
    res.json({message:"server is running"})
})

//Create user 
server.post("/api/users",(req,res)=>{
    const userData = req.body


    
})

//Return an array of users
server.get("/api/users",(req,res)=>{
    const users= db.find()
    res.json(users)
    
})
//Returns the user object with the specified id
server.get("/api/users/:id",(req,res)=>{

})
// Removes the user with the specified id and return the delete user
server.delete("/api/users/:id",(req,res)=>{

})
//Updates the user with the specified id
server.put("/api/users/:id",(req,res)=>{

})


module.exports = server; // EXPORT YOUR SERVER instead of {}
