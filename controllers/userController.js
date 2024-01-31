require('dotenv').config();
const db = require('../models/db')
const jwt = require('jsonwebtoken')

exports.showDashboard = (req,res) => {
    res.render('dashboard', { user: req.cookies.user })
}
