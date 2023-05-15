const Schedule = require("../model/Schedule");
const Doctor = require('../model/Doctor');

const getSchedule = async (req, res) => {
    
    const {email} = req.params;
    if(!email) {
        return res.status(400).json({"message" : "Email is required to get the schedule"});
    }
    const schedule = await Schedule.findOne({doctor_email : email}).exec();
    if(!schedule) {
        return res.status(204);
    }

    res.json(schedule);
}
const postSchedule = async (req, res)=> {
    const {email, slots, days, max_patient} = req.body;
    
    const doctor = await Doctor.findOne({email : email});

    if(!doctor) {
        return res.status(204).json({"message" : `Doctor with ${email} not exist`});
    }

    const schedule = await Schedule.findOne({doctor_email : email});
    if(schedule) {
        await Schedule.deleteOne({doctor_email : email});
    }

    const result = await Schedule.create({
        'doctor_email' : email,
        'slots' : slots,
        'days' : days,
        'max_patient' : max_patient 
    });

    res.status(201).json({"message" : "Schedule created/updated."})
}

module.exports = {
    getSchedule, 
    postSchedule
}