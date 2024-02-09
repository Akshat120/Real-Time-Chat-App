const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController.js')
const chatController = require('../controllers/chatController.js')
const userCheck = require('../middleware/userCheck.js')

router.get('/dashboard/:id', userCheck.verifyUserToken, userController.showDashboard)
router.get('/:id/chats/:fr_id', userCheck.verifyUserToken, chatController.showChat)

router.post('/logout', userController.logout)

module.exports=router
