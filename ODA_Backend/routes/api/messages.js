const express = require("express");
const router = express.Router();
const messageController = require("../../controller/messageController");

router.route('/')
    .get(messageController.getAllMessage)
    .post(messageController.postMessage);

module.exports = router;