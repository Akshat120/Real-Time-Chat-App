const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

exports.useBasicMethods = (app)=>{
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.set('view engine','ejs')
}