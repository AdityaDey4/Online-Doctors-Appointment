const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointmentController");

router.route('/:email')
    .get(appointmentController.getPatientsAppointments)

module.exports = router;