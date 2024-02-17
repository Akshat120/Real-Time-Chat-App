const userCollection = require('./schema').userCollection
const friendsRelationCollection = require('./schema').friendsRelationCollection
const messageCollection = require('./schema').messageCollection

exports.check_username_and_password = (form_user) => {
    return new Promise(async(resolve,reject)=>{
        await userCollection.findOne({ username: form_user.username, password: form_user.password })
        .then(data=>{
            console.log("data=",data)
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

exports.getAllFriends = (userId) => {
    return new Promise(async(resolve,reject)=>{
        await friendsRelationCollection.findOne({userId: userId })
        .then(async(data)=>{
            let friends = []
            await userCollection.find({
                _id: { $in: data.friends }
              }).then(foundFriends=>{
                foundFriends.forEach( data =>{
                    friends.push({
                        name: data.username,
                        _id: data._id
                    })
                })
              }).catch(err=>{
                reject(err)
              })
            resolve(friends)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

exports.getUserById = (userId) => {
    return new Promise(async(resolve,reject)=>{
        await userCollection.findOne({ _id: userId })
        .then(data=>{
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

exports.getChats = (user_1_id, user_2_id) => {
    return new Promise(async(resolve,reject)=>{
        chats = []

        await messageCollection.findOne({userId:user_2_id})
        .then(data=>{
            data.message.forEach( msg=>{
                if(msg.to == user_1_id) {
                    chats.push({
                        "from":user_2_id,
                        "to":user_1_id,
                        "data":msg.data,
                        "sent_at":msg.sent_at
                    })
                }
            })
        })
        .catch(err=>{
            reject(err)
        })

        await messageCollection.findOne({userId:user_1_id})
        .then(data=>{
            data.message.forEach( msg=>{
                if(msg.to == user_2_id) {
                    chats.push({
                        "from":user_1_id,
                        "to":user_2_id,
                        "data":msg.data,
                        "sent_at":msg.sent_at
                    })
                }
            })
        })
        .catch(err=>{
            reject(err)
        })

        chats.sort((a, b) => a.sent_at - b.sent_at);
        resolve(chats)
    })
}

exports.sendChat = (from_id, to_id, msg) => {
    return new Promise(async(resolve,reject)=>{

        // Prepare the message object to be pushed
        const messageData = {
            to: to_id,
            data: msg,
            sent_at: new Date() // Use the current date and time
        };

        // Use $push to add the message to the message array
        await messageCollection.findOneAndUpdate(
            { userId: from_id }, // filter document by userId
            { $push: { message: messageData } }, // push to the message array
            { new: true, upsert: true } // options: return the updated document, create if not exists
        ).then(updatedDocument=>{
            resolve(updatedDocument);
        }).catch(err=>{
            resolve(err);
        })
    
})
}