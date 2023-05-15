const express = require("express");
const router = express.Router();

const patientRegisterController = require("../controller/patientRegisterController");

router.post("/", patientRegisterController.handleNewPatient);

module.exports = router;