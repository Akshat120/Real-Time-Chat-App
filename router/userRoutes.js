const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController.js')
const userCheck = require('../middleware/userCheck.js')

router.get('/dashboard/:id', userCheck.verifyUserToken, userController.showDashboard)
router.get('/:id/chats/:fr_id', userCheck.verifyUserToken, userController.showChat)

router.post('/logout', userController.logout)

module.exports=router
