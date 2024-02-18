require('dotenv').config();
const { createServer } = require('node:http');
const { Server } = require("socket.io");

const redis = require('redis');
const redisClient = redis.createClient(ENV.REDIS_URL);

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

exports.mainSocket = (app)=>{
    const server = createServer(app);
    const io = new Server(server);
    const db = require('../models/db')

    io.on('connection', (socket) => {
        socket.on('register', userId => {
            redisClient.setEx(userId, 60*60*24, socket.id).then(_data=>{
                console.log(`${userId} is stored in redis having value ${socket.id}`)
            }).catch(err=>{
                console.log("err",err)
            })
        });

        socket.on('chat message', async (from_id, to_id, msg, callback) => {
            await redisClient.get(to_id).then(socketId=>{
                console.log(socketId)
                io.to(socketId).emit('received-message', from_id, msg) // 'value' or null if the key doesn't exist or expired
            }).catch(err=>{
                console.error(err);
                console.log(`User ${to_id} not connected.`);
            })

            await db.sendChat(from_id,to_id,msg).then(_data=>{
                callback();
            }).catch(err=>{
                console.log('error:',err)
            })

        });

        // socket.on('disconnect', () => {
        //     // Find the user associated with the disconnected socket and remove them

        //     client.del("key", function(err, response) {
        //         if (err) {
        //           console.error("Error:", err);
        //         } else {
        //           console.log("Number of keys removed:", response);
        //         }
        //       });

        //     const userId = Object.keys(userId_socketId_map).find(key => userId_socketId_map[key] === socket.id);
        //     if (userId) {
        //         delete userId_socketId_map[userId]; // Remove the user from the map
        //         console.log(`User ${userId} disconnected.`);
        //     }
        // });
    });

    return server
}