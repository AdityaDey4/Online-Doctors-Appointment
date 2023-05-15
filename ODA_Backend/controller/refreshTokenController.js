const Patient = require('../model/Patient');
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.sendStatus(401);
    }

    const currRefreshToken = cookies.jwt;

    const foundPatient = await Patient.findOne({refreshToken : currRefreshToken});

    const foundAdmin = await Admin.findOne({refreshToken : currRefreshToken});

    if(!foundAdmin && !foundPatient) {
        return res.sendStatus(403);
    }

    const user = !foundAdmin ? foundPatient : foundAdmin;

    jwt.verify(
        currRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded)=> {

            if(err || user.email !== decoded.email) {
                return res.sendStatus(403);
            }

            const role = user.role;
            const accessToken = jwt.sign(
                {
                    "UserInfo" : {
                        "email" : user.email,
                        "role" : role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : '1d'}
            );

            res.json({accessToken});
        }
    );
}

module.exports = {handleRefreshToken};