const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController.js')
const userCheck = require('../middleware/userCheck.js')

router.get('/dashboard/:id', userCheck.verifyUserToken, userController.showDashboard)

module.exports=router
