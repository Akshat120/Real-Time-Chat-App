require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.showHomePage = (req,res) => {
    res.render("home")
}
exports.postLogin = async (req,res) => {

    user = req.body

    await db.check_username_and_password(user).then(data=>{
        const token = jwt.sign(user, process.env.USER_LOGIN_SECRET, { expiresIn: '1h' }); // Expires in 1 hour
        console.log("token-controller:",token)
        res.cookie("user_login_token", token, { expiresIn: "1d", httpOnly: true });
        res.redirect('/')
    }).catch(err=>{
        res.redirect('/')
    })
}
