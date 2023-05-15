const express = require("express");
const router = express.Router();
const appointmentController = require("../../controller/appointmentController");

router.route('/')
    .get(appointmentController.getAllAppointment)
    .post(appointmentController.postAppointment)
    .put(appointmentController.updateAppointment)

router.route("/:_id")
    .get(appointmentController.getAppointment);

module.exports = router;