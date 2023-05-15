const mongoose = require('mongoose');
const memSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
   
});

module.exports=mongoose.model("Admin",memSchema);