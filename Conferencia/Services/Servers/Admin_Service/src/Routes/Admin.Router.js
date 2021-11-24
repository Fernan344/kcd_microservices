const express = require("express")
const router = express.Router()
const adminController = require("../Controller/Admin.Controller")

router.get("/", adminController.index)
router.get("/getAll", adminController.getAll)

module.exports = router