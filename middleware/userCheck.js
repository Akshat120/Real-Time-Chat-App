require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.isUserLogged = (req,res,next) => {
    console.log("Middleware isUserLogged got hit!!")

    if( req.cookies == "undefined" || req.cookies.user_login_token == "undefined") next()
    else {
        const storedToken = req.cookies.user_login_token;
        console.log("storedToken:", storedToken)
        // Verify a JWT token
        jwt.verify(storedToken, process.env.USER_LOGIN_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                next()
            } else {
                console.log('Token verified. Decoded data:', decoded);
                res.redirect('/dashboard/asdasd')
            }
        })
    }
}
exports.shouldNotLoggedIn = (req,res,next) => {
    console.log("Middleware shouldNotLoggedIn got hit!!")
    next()
}
