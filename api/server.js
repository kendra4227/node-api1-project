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

server.post("/api/users",(req,res)=>{
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
        res.status(404).json( "Please provide name and bio for the user")
    }
    else{
    User.insert(newUser)
    .then(users=>{
        res.status(201).json(users)
    })
    .catch(err=>{
        res.status(500).json({message:err.message})
    })
    }
})

//| DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.  
server.delete("/api/users/:id",async(req,res)=>{
    try{
        const {id}= req.params
        const deletedUser = await User.remove(id)
        if(!deletedUser){
            res.status(404).json("User not found")
        }else{
        res.status(200).json(deletedUser)
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


//| PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |
server.put("/api/users/:id",async(req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        if(!changes.name || !changes.bio){
            res.status(500).json({message:"The user information could not be modified"})
        }else{
        const updatedUser = await User.update(id,changes)
        if(!updatedUser){
            res.status(404).json("The user with the specified ID does not exist")
        }else
        res.status(200).json(updatedUser)
  }
}
    catch(err){
        res.status(500).json({message:err.message})

    }
})





















    module.exports = server
