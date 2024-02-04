require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.showDashboard = (req,res) => {
    db.getAllFriends(req.cookies.user.id).then(friends=>{
        res.render('dashboard', { user: req.cookies.user, friends: friends })
    }).catch(err=>{
        res.send({
            "err": err
        })
    })
}

exports.showChat = (req,res) => {
    if(req.params.fr_id != req.cookies.user.id) {
        db.getUserById(req.params.fr_id).then( fr_user => {
            res.render('chat', { user: req.cookies.user, fr_user: fr_user })
        }).catch( err => {
            res.send({
                "err":err
            })
        })  
    } else {
        res.redirect('/')
    }
}

exports.logout = (req,res) => {
    res.clearCookie('token')
    res.clearCookie('user')
    res.redirect('/')
}


