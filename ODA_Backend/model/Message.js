const mongoose = require("mongoose");
const schema = mongoose.Schema;

const messageSchema = new schema({
    name : String, 
    email : String,
    message : String
});

module.exports = mongoose.model("messages", messageSchema);