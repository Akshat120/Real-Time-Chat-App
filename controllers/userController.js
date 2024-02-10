require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.showDashboard = (req,res) => {
    db.getAllFriends(req.cookies.user._id).then(friends=>{
        console.log(friends)
        res.render('dashboard', { user: req.cookies.user, friends: friends })
    }).catch(err=>{
        res.send({
            "err": err
        })
    })
}

exports.logout = (req,res) => {
    res.clearCookie('token')
    res.clearCookie('user')
    res.redirect('/')
}


