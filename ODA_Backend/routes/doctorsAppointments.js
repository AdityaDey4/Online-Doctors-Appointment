const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointmentController");

router.route('/:email')
    .get(appointmentController.getDoctorsAppointment)

module.exports = router;