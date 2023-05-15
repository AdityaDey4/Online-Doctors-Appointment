const express = require("express");
const router = express.Router();
const patientController = require("../../controller/patientController");

router.route('/')
    .get(patientController.getAllPatients)
    .delete(patientController.deletePatient);

router.route('/:email')
    .get(patientController.getPatient);

module.exports = router;