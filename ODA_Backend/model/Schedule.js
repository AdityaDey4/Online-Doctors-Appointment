const mongoose = require("mongoose");
const schema = mongoose.Schema;

const scheduleSchema = new schema({
    doctor_email : String,
    slots : Object,
    days : Object,
    max_patient : Number
});

module.exports = mongoose.model("schedule", scheduleSchema);