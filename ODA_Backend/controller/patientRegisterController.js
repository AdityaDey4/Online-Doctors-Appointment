const Patient = require("../model/Patient");
const bcrypt = require("bcrypt");

const handleNewPatient = async(req, res)=> {
    
    const {name, password, email, age, gender, address, mobile} = req.body;

    const duplicate = await Patient.findOne({email : email}).exec();

    if(duplicate) {
        return res.status(409).json({'message' : `Patient with ${email} already exist`});
    }

    try {

        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await Patient.create({
            "name" : name,
            "email" : email,
            "password" : hashedPwd,
            "gender" : gender,
            "age" : age,
            "mobile" : mobile,
            "address" : address
        });

        res.status(201).json({"message" : `New Patient ${name} has been created`});

    }catch(err) {
        res.status(500).json(err.message);
    }
}

module.exports = {handleNewPatient};