const mongoose = require('mongoose');

const  connectdb = async()=>{

    await mongoose.connect(
       "mongodb+srv://wajahat7217:1qmQQNMCYV3TH0Wa@cluster0.itc2o.mongodb.net/devtinder" 
    );
}

module.exports=connectdb;