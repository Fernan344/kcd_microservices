const express = require("express")
const router = express.Router()
const chatController = require("../Controller/Chat.Controller")

router.get("/", chatController.index)
router.post("/getMessages", chatController.getMessages)
router.get("/getUsers", chatController.getUsers)
router.post("/sendMessage", chatController.sendMessage)

module.exports = router