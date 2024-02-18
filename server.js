require('dotenv').config();
require("./connectDB");
const express = require('express')
const { createServer } = require('node:http');
const app = express()
const router = require('./router/router')
const path = require('path')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server);
const db = require('./models/db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())


app.set('view engine','ejs')
app.set("views", path.join(__dirname, "views"));

// Basic authentication middleware
const basicAuth = require('express-basic-auth');

// Custom authentication function
const myAuthorizer = (username, password) => {
    const userMatches = basicAuth.safeCompare(username, process.env.SITE_USERNAME);
    const passwordMatches = basicAuth.safeCompare(password, process.env.SITE_PASSWORD);

    return userMatches & passwordMatches;
};

app.use(basicAuth({
    authorizer: myAuthorizer,
    challenge: true,
    realm: 'My Application',
}));


let userId_socketId_map = {};

io.on('connection', (socket) => {
    socket.on('register', userId => {
        userId_socketId_map[userId] = socket.id;
        console.log("registered=>",userId_socketId_map)
    });

    socket.on('chat message', (from_id, to_id, msg) => {
        console.log(from_id, to_id, msg)
        const socketId = userId_socketId_map[to_id];
        if (socketId) {
            io.to(socketId).emit('received-message', from_id, to_id);
        } else {
            console.log(`User ${to_id} not connected.`);
        }

        db.sendChat(from_id,to_id,msg).then(data=>{
            console.log('msg sent successfully:',data)
        }).catch(err=>{
            console.log('error:',err)
        })

    });

    socket.on('disconnect', userId => {
        userId_socketId_map[userId] = null;
        console.log("disconnected=>",userId_socketId_map)
    });
});

app.use('/',router)

server.listen(3000, () => {
    console.log("Server is Started!!")
});
