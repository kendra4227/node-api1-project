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
     db.insert({

		name: req.body.name,
        bio:req.body.bio
	})

    .then((newUser) => {
        if (!req.body.name || !req.body.bio){
         return res.status(400).json({
          message: "Please provide name and bio for the user",
         })
     } else {
     
             res.status(201).json(newUser);
         }
        })
        .catch((error) => {
            console.log(error)
           res.status(500).json({
                 message: "There was an error while saving the user to the database"
            });
     });
     

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
     db.findById(req.params.id)

    if (user) {
		res.json(user)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})
// Removes the user with the specified id and return the delete user
server.delete("/api/users/:id",(req,res)=>{
    db.remove(req.params.id)
  
  .then((user) => {
    if(user){
      res.json(user)
    } else {
      res.status(404).json({
        message: "The user with the specified ID does not exist"
      })
    }
  })
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The user could not be removed"
    })
  })

})
//Updates the user with the specified id
server.put("/api/users/:id",async (req,res)=>{
    if (!req.body.name || !req.body.bio){ 
    return res.status(404).json({
      message: "The user with the specified ID does not exist"
    })
  } 
  db.update(users[req.params.id-1].id, {
    name: req.body.name,
    bio: req.body.bio,
  })
  .then((updatedUser) => {
    console.log(updatedUser)
      res.status(200).json(updatedUser)
    })
    })  
  .catch((error)=>{
       console.log(error)
  })
  
  
  .catch((error) => {
    console.log(error)
    res.status(500).json({
      message: "The user information could not be modified"
    })
  })
  })





module.exports = server; // EXPORT YOUR SERVER instead of {}
