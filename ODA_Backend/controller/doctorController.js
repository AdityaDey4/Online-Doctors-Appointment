const Doctor = require("../model/Doctor");

const getAllDoctors = async (req, res) => {
  const doctor = await Doctor.find();

  if (doctor.length === 0) {
    return res.status(204).json({ message: "No doctors Found" });
  }
  res.json(doctor);
};

const deleteDoctor = async (req, res) => {
  if (!req?.body?.email)
    return res.status(400).json({ message: "Email is required" });

  const doctor = await Doctor.findOne({ email: req.body.email }).exec();

  if (!doctor) {
    return res
      .status(204)
      .json({ message: `doctor with Email ${req.body.email} not found` });
  }

  const result = await Doctor.deleteOne({ email: req.body.email });
  res.json({ message: "Successfully Deleted" });
};

const updateDoctor = async (req, res)=> {
  const {email, yoe, mobile, degree, specialist} = req.body;

  const doctor = await Doctor.findOne({email : email});
  if(doctor) {
    doctor.yoe = yoe,
    doctor.mobile = mobile;
    doctor.degree = degree;
    doctor.specialist = specialist;
  }
}

const getDoctor = async (req, res) => {
  if (!req?.params?.email)
    return res.status(400).json({ message: "Email is required" });

  const doctor = await Doctor.findOne({ email: req.params.email }).exec();
  if (!doctor) {
    return res
      .status(204)
      .json({ message: `doctor with email ${req.params.email} not found` });
  }
  res.json(doctor);
};

const postDoctor = async (req, res) => {
  console.log(req.files);

  var imgobj = req.files.dimg;
  imgobj.mv("./public/d_img/" + imgobj.name, async (err) => {
    if (err) {
      throw err;
    } else {
      const { name, email, degree, mobile, yoe, specialist } = req.body;

      const duplicate = await Doctor.findOne({ email: email }).exec();
      if (duplicate) {
        return res
          .status(409)
          .json({ message: `Doctor with email : ${email}, already exist.` });
      }

      try {
        const result = await Doctor.create({
          name: name,
          email: email,
          degree: degree,
          mobile: mobile,
          yoe: yoe,
          specialist: specialist,
          image: imgobj.name,
        });

        res
          .status(201)
          .json({ message: `New Doctor ${name} has been created` });
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
  });
};

module.exports = {
  getAllDoctors,
  deleteDoctor,
  getDoctor,
  postDoctor,
  updateDoctor
};
