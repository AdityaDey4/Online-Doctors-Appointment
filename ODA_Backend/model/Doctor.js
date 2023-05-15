const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = new schema({
    name : String,
    email : String,
    degree : String,
    mobile : Number,
    yoe : Number,
    specialist : String,
    image:String
});

module.exports = mongoose.model("doctors", doctorSchema);