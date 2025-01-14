const express=require('express');
const connectdb=require("./config/database");
const app=express();
const User=require('./models/user');
const user = require('./models/user');

app.use(express.json());


app.post("/signup",async (req,res)=>{
    const userObj={
       firstName:"Virat",
       lastName:"Kohli",
       email:"virat@kohli.com",
       age:"34",
       gender:"Male"
    }
    const user = new User(req.body)
    try{
        await user.save();
        res.send("User added successfully");
    }
    catch{
        res.status(400).send("Error Adding User");
    };
});

app.get("/user",async (req,res)=>{
    const userEmail = req.body.email;

    try{
        const user = await User.find({email:userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
            res.send(user);
        }
    }
    catch{
        res.send("Something Went Wrong");
    }
});

app.get("/feed", async(req,res)=>{
      try{
        const users= await User.find();
        if(!users){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
      }
      catch(err){
        res.send("Something Went Wrong");
      }
});

app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;

    try{
       const user= await User.findByIdAndDelete({_id:userId});
       res.send("User Deleted Successfully"); 
    }
    catch(err){
        res.status(404).send("Something Went Wrong");
    }
})

app.patch("/user",async (req,res)=>{
    const updateUser=req.body.userId;
    const data=req.body;

    try{
        const user=await User.findByIdAndUpdate({_id: updateUser}, data);
        res.send("User Updated Successfully");
    }
    catch(err){
        res.status(404).send("Something Went Wrong");
    }
});

connectdb()
 .then(() => {
     console.log("connection to database is successful");

     app.listen(3000, ()=> {
        console.log("Server is listening to port 3000......");
    })
 })
 .catch((err)=>{
 console.error("connection to database failed",err.message);
 });

