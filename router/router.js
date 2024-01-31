const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js')
const userCheck = require('../middleware/userCheck.js')
const userRoutes = require('./userRoutes.js')

router.get('/', userCheck.isUserLogged, homeController.showHomePage)
router.post('/login', userCheck.shouldNotLoggedIn, homeController.postLogin)

router.use('/user',userRoutes)

module.exports=router
