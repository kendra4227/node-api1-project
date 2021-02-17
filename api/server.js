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
    const user = req.body

    if (!user.name || !user.bio) {
        res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user."})
    } else {
        db.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({
                error: "There was an error while saving the user to the database"
            });
        });
    }


    
})

//Return an array of users
server.get("/api/users",(req,res)=>{
    db.find().then(users => {
        console.log(`Fetching:`,res);
        res.status(200).json(users);
        }).catch(error => {
            res.status(500).json({ message: error });
        });
    
    
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
