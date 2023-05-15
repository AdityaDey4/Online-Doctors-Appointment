require("dotenv").config();
const express = require("express");
const app = express();
const flu=require("express-fileupload");
app.use(flu());
const bodyParser = require('body-parser');
const credentials  = require('./myMiddleware/credentials');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const connectDB = require("./config/dbConnect");
app.use(express.static('public'))
const PORT = process.env.PORT || 4500;

// connecting with local database
connectDB(); 
const auth=require("./routes/Authmycls");
app.use(credentials);
app.use(cors(corsOption));


// built-in middleware
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use('/patientRegister', require("./routes/patientRegister"));
app.use('/admin', require('./routes/adminRegister'))
app.use('/doctorAppointments', require('./routes/doctorsAppointments'));
app.use('/patientAppointments', require('./routes/patientAppointments'));
app.use('/refresh', require("./routes/refresh"));
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));

app.use('/patients', require("./routes/api/patients"));
app.use('/doctors', require('./routes/api/doctors'));
app.use('/messages', require('./routes/api/messages'));
app.use('/schedule', require('./routes/api/schedules'));
app.use('/appointments', require("./routes/api/appointments"));


//app.use(require("./myMiddleware/errorHandler"));
app.use("/authmy",auth);
app.listen(PORT, ()=> {
    console.log("Server is running in PORT : "+PORT);
});

// app.post("/insdoctor",async (req,res)=>{
//     console.log(req.body);
//      console.log(req.files.dimg)
// });
