// BUILD YOUR SERVER HERE
const express = require('express');

const User = require("./users/model.js") 

const server = express()

server.use(express.json())

//ENDPOINTS

// server.use("*", (req, res) => {
//     res.status(200).json({message:"Hello World"})
//   });

//| GET    | /api/users     | Returns an array users. 
server.get("/api/users", (req,res)=>{
    User.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    })
      //  | GET    | /api/users/:id | Returns the user object with the specified `id`.  

server.get("/api/users/:id",(req,res)=>{
    const idVar = req.params.id

    User.findById(idVar)
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        res.status(500).json({message:err.message})
    })
})
//| POST   | /api/users     | Creates a user using the information sent inside the `request body`. 

server.post()






















    module.exports = server
