const mongoose = require("mongoose");
const schema = mongoose.Schema;

const appointmentSchema = new schema({
    patient_email : String,
    doctor_email : String,
    curr_date : String,
    fixing_date : String,
    slot : String,
    status : {
        type : String,
        default : "Pending"
    }
});

module.exports = mongoose.model("appointments", appointmentSchema);