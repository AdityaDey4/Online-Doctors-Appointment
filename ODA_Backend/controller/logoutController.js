const Patient = require('../model/Patient');
const Admin = require('../model/Admin');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const currRefreshToken = cookies.jwt;

    const foundPatient = await Patient.findOne({refreshToken : currRefreshToken});

    const foundAdmin = await Admin.findOne({refreshToken : currRefreshToken});

    if(foundAdmin) {
        foundAdmin.refreshToken = "";
        await foundAdmin.save();
    }
    else if(foundPatient) {
        foundPatient.refreshToken = "";
        await foundPatient.save();
    }

    res.clearCookie(
        'jwt',
        {secure : true, httpOnly : true, sameSite : 'None', maxAge : 24*60*60*1000}
    );

    return res.sendStatus(204);
}

module.exports = {handleLogout};