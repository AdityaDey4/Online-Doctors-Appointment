const express = require("express");
const router = express.Router();
const scheduleController = require("../../controller/scheduleController");

router.route('/')
    .post(scheduleController.postSchedule);
router.route('/:email')
    .get(scheduleController.getSchedule)

module.exports = router;