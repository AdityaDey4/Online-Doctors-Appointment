const Patient = require('../model/Patient');
const Admin = require('../model/Admin');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res)=> {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({"message" : "email & Password are required & device should be connected with internet"});
    }

    const foundPatient = await Patient.findOne({email : email});

    const foundAdmin = await Admin.findOne({email : email});

    if(!foundPatient && !foundAdmin) {
        return res.sendStatus(401);
    }

    if(foundAdmin) {

        const adminMatch = await bcrypt.compare(password, foundAdmin.password);

        if(adminMatch) {

            const role = foundAdmin.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : foundAdmin.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1d'}
            );

            const refreshToken = jwt.sign(
                {'email' : foundAdmin.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '5d'}
            );

            foundAdmin.refreshToken = refreshToken;
            const result = await foundAdmin.save();
            console.log(result);

            res.cookie(
                'jwt',
                refreshToken,
                {secure : true, httpOnly : true, sameSite : "None", maxAge : 24*60*60*1000}
            );

            return res.json({email, role, accessToken});
        }
    } 
    
    else if(foundPatient) {

        const patientMatch = await bcrypt.compare(password, foundPatient.password);

        if(patientMatch) {
            const role = foundPatient.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : foundPatient.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1d'}
            );

            const refreshToken = jwt.sign(
                {'email' : foundPatient.email},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn : '5d'}
            );

            foundPatient.refreshToken = refreshToken;
            const result = await foundPatient.save();
            console.log(result);

            res.cookie(
                'jwt',
                refreshToken,
                {secure : true, httpOnly : true, sameSite : "None", maxAge : 24*60*60*1000}
            );

            return res.json({email, role, accessToken});
        }
    } 
    res.sendStatus(401);
}

module.exports = {handleLogin};