const Patient = require("../model/Patient");

const getAllPatients = async (req, res) => {

    const patients = await Patient.find();

    if(patients.length == 0) {
        res.status(204).json({"message" : "No Patient Found"})
    }
    res.json(patients);
}

const deletePatient = async (req, res)=> {

    if(!req?.body?.email) return res.status(400).json({"message" : "Email is required to delete a patient"});

    const patient = await  Patient.findOne({email : req.body.email}).exec();

    if(!patient) {
        return res.status(204).json({ 'message': 'Patient not found' });
    }

    const result = await Patient.deleteOne({email : req.body.email});
    res.json({"message" : "Successfully Deleted"});
}

const getPatient = async(req, res)=> {

    if (!req?.params?.email) return res.status(400).json({ "message": 'Email is required' });

    const patient = await Patient.findOne({email: req.params.email }).exec();
    if (!patient) {
        return res.status(204).json({ "message": 'Patient not found' });
    }
    console.log(patient);
    res.json(patient);
}

module.exports = {
    getAllPatients,
    deletePatient,
    getPatient
}