require("./connectDB");
const express = require('express')
const app = express()
const router = require('./router/router')
const path = require('path')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.set('view engine','ejs')
app.set("views", path.join(__dirname, "views"));

app.use('/',router)
app.listen(3000, ()=>{
    console.log("Server is Started!!")
})
