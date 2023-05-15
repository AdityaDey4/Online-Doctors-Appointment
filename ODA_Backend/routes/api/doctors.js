const express = require("express");
const router = express.Router();
const doctorController = require("../../controller/doctorController");

router.route('/')
    .get(doctorController.getAllDoctors)
    .post(doctorController.postDoctor)
    .delete(doctorController.deleteDoctor)
    .put(doctorController.updateDoctor);

router.route("/:email")
    .get(doctorController.getDoctor);

module.exports = router;