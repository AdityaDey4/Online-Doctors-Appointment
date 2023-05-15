const mongoose = require("mongoose");
const schema = mongoose.Schema;

const patientSchema = new schema({
    name : String,
    password : String,
    email : String,
    age : Number,
    gender : String,
    mobile : Number,
    address : String,
    role : {
        type : Number,
        default : 2001
    },
    refreshToken : String
});

module.exports = mongoose.model("patients", patientSchema);