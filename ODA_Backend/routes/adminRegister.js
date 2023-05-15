const express = require("express");
const router = express.Router();

const adminRegisterController = require("../controller/adminRegisterController");

router.route("/")
    .post(adminRegisterController.handleNewAdmin);


router.route("/:email")
    .get(adminRegisterController.getAdmin);
    
module.exports = router;