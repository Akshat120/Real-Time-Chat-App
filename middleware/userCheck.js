require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.isUserLogged = (req,res,next) => {
    console.log("Middleware isUserLogged got hit!!")

    if( req.cookies == undefined || req.cookies.token == undefined) next()
    else {
        const storedToken = req.cookies.token;
        console.log("storedToken:", storedToken)
        // Verify a JWT token
        jwt.verify(storedToken, process.env.USER_LOGIN_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                next()
            } else {
                console.log('Token verified. Decoded data:', decoded); 
                res.redirect(`/user/dashboard/${decoded._id}`)
            }
        })
    }
}
exports.verifyUserToken = (req,res,next) => {
    console.log("Middleware verifyUserToken got hit!!")

    if( req.cookies == undefined || req.cookies.token == undefined) res.redirect('/')
    else {
        const storedToken = req.cookies.token;
        console.log("storedToken:", storedToken)
        // Verify a JWT token
        jwt.verify(storedToken, process.env.USER_LOGIN_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                res.send(404)
            } else {
                console.log('Token verified. Decoded data:', decoded);
                if(req.params.id != decoded._id) res.send(404)
                else next()
            }
        })
    }
}

exports.shouldNotLoggedIn = (req,res,next) => {
    console.log("Middleware shouldNotLoggedIn got hit!!")
    next()
}
