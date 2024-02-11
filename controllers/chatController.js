require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.showChat = (req,res) => {
    if(req.params.fr_id != req.cookies.user._id) {
        db.getUserById(req.params.fr_id).then( fr_user => {
            db.getChats(req.cookies.user._id, req.params.fr_id).then( msg => {
                res.render('chat', { user: req.cookies.user, fr_user: fr_user, msg: msg })
            }).catch( err => {
                res.send({
                    "err":err
                })
            })
        }).catch( err => {
            res.send({
                "err":err
            })
        })  
    } else {
        res.redirect('/')
    }
}