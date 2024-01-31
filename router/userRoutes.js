const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js')
const userCheck = require('../middleware/userCheck.js')

router.get('/dashboard/:id', userCheck.isUserLogged, homeController.showHomePage)

module.exports=router
