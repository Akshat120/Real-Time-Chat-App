require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')


exports.showChat = (req,res) => {
    if(req.params.fr_id != req.cookies.user.id) {
        db.getUserById(req.params.fr_id).then( fr_user => {
            db.getChatsByIdPair(req.cookies.user.id, req.params.fr_id).then( msg => {
                console.log(msg)
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