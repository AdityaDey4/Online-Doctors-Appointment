const Appointment = require('../model/Appointment');

const getAllAppointment = async (req, res) => {

    const appointments = await Appointment.find();

    if(appointments.length === 0) {
        return res.status(204).json({"message" : "No Appointment Found"});
    }

    res.json(appointments);
}

const getAppointment = async (req, res) => {

    const _id = req?.params?._id;
    if(!_id) return res.status(400).json({"message" : "_id is needed."});

    const appointment = await Appointment.findOne({_id : _id});
    if(!appointment) return res.status(204).json({"message" : `No appointment found of id : ${_id}`});

    res.json(appointment);
}

const postAppointment = async (req, res)=> {
    const {patient_email, doctor_email, curr_date, fixing_date, slot} = req.body;

    try {
        
        const result = await Appointment.create({
            "doctor_email" : doctor_email,
            "patient_email" : patient_email,
            "curr_date" : curr_date,
            "fixing_date" : fixing_date,
            "slot" : slot
        });

        res.status(201).json({"message" : `Appointment has been created successfully`})
    }catch(err) {
        res.status(500).json(err.message);
    }
}

const getDoctorsAppointment = async (req, res)=> {
    
    const doctor_email = req.params.email;

    const appointments = await Appointment.find({"doctor_email" : doctor_email});
    res.json(appointments);
}

const getPatientsAppointments = async (req, res)=> {
    
    const {email} = req.params;

    const appointments = await Appointment.find({"patient_email" : email});
    res.json(appointments);
}

const updateAppointment = async (req, res)=> {
    const {_id, status} = req.body;

    const appointment = await Appointment.findOne({_id : _id});
    if(!appointment) return res.status(204).json({"message" : `No appointment found of id : ${_id}`});

    try {
        appointment.status = status;
        const result = await appointment.save()

        res.json(result);
    }catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {
    getAllAppointment,
    getAppointment,
    postAppointment,
    getDoctorsAppointment,
    getPatientsAppointments,
    updateAppointment
}