const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        minLength:4,
        maxLength:20
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        minLength:8,
        required:true,
        unique:true,
        trim:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        },
    },

    about:{
        type:String,
        default:"this is a default generated about"
    },

    skills:{
        type:[String]
    }
},
   {
    timestamp:true
   },
)

module.exports=mongoose.model("User",userSchema);