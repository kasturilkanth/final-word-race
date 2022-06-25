const express = require("express");
const userController = require("./user.controller");

const router = express.Router();

router.post("/addUser", userController.addUser);
router.post("/getUser", userController.getUser);
router.put("/updateUserData", userController.updateUserData);

module.exports = router;
