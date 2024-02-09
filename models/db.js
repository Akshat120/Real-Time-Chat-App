const data = require('./data')
const jwt = require('jsonwebtoken');

exports.check_username_and_password = (form_user) => {
    return new Promise((resolve,reject)=>{
        data.users.forEach(user => {
            if(user.username === form_user.username && user.password === form_user.password) {
                return resolve(user)
            }
        });
    
        return reject("User Not Found!")

    })
}

exports.getAllFriends = (userId) => {
    return new Promise((resolve,reject)=>{
        friends_data = []
        data.friends_relation.forEach( friends => {
            if(friends.userId == userId) {
                data.users.forEach(user => {
                    if(friends.friends.get(user.id)) {
                        friends_data.push({
                            id: user.id,
                            name: user.username,
                        })
                    }
                })
            }
        })

        return resolve(friends_data)

    })
}

exports.getUserById = (userId) => {
    return new Promise((resolve,reject)=>{
        data.users.forEach(user => {
            console.log(userId, user.id)
            if(user.id == userId) {
                return resolve({
                    id: user.id,
                    name: user.username
                })
            }
        });
        return reject("User Not Found!")
    })
}

exports.getChatsByIdPair = (id1, id2) => {
    if(id1 > id2) {
        let c = id2
        id2 = id1
        id1 = c
    }
    return new Promise((resolve,reject)=>{
        data.message.forEach(msg => {
            if(msg.user1 == id1 && msg.user2 == id2) {
                msg_list = msg.messages
                msg_list.sort((a, b) => a.sent_at - b.sent_at);
                return resolve(msg_list)
            }
        });
        return resolve([])
    })
}