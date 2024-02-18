require('dotenv').config();
require("./connectDB");
const express = require('express')
const app = express()
const router = require('./router/router')
const path = require('path')
const useBasicAuth = require('./middleware/basicAuth').useBasicAuth
const useBasicMethods = require('./middleware/basicMethods.js').useBasicMethods
const mainSocket = require('./socket/main.js').mainSocket

useBasicMethods(app);
app.set("views", path.join(__dirname, "views"));
useBasicAuth(app);
server = mainSocket(app);

app.use('/',router)

server.listen(3000, () => {
    console.log("Server is Started!!")
});
