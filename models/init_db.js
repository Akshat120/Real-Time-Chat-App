require('../connectDB')
const userCollection = require('./schema').userCollection
const friendsRelationCollection = require('./schema').friendsRelationCollection
const messageCollection = require('./schema').messageCollection

async function initialize_db() {
    
    let result = await userCollection.deleteMany({});
    console.log(`${result.deletedCount} users were deleted.`);

    result = await friendsRelationCollection.deleteMany({});
    console.log(`${result.deletedCount} friends relation were deleted.`);

    result = await messageCollection.deleteMany({});
    console.log(`${result.deletedCount} messages relation were deleted.`);

    let insertManyResult = await userCollection.insertMany([
        { username: "john", password: "jn123" }, 
        { username: "smith", password: "sh123" },
        { username: "akshat", password: "ak123" },
        { username: "ankit", password: "ak123" },
    ]);
    console.log('Insert Many Result:', insertManyResult);
    const users = await userCollection.find({})

    insertManyResult = await friendsRelationCollection.insertMany([
        { userId: users[0]._id, friends:[ users[1]._id, users[2]._id, users[3]._id ] },
        { userId: users[1]._id, friends:[ users[0]._id, users[2]._id, users[3]._id ] },
        { userId: users[2]._id, friends:[ users[0]._id, users[1]._id, users[3]._id ] },
        { userId: users[3]._id, friends:[ users[0]._id, users[1]._id, users[2]._id ] }
    ]);
    console.log('Insert Many Result:', insertManyResult);

    insertManyResult = await messageCollection.insertMany([
        {
            userId: users[0]._id,
            message: [
                {
                    "to": users[1]._id,
                    "data": `Hi, I'm ${users[0].username}. How are you ${users[1].username}?`,
                    "sent_at": new Date(2024, 0, 1, 10, 30, 0)
                },
                {
                    "to": users[1]._id,
                    "data": "Hi, I'm also fine.",
                    "sent_at": new Date(2024, 0, 1, 10, 30, 30)
                }
            ]
        },
        {
            userId: users[1]._id,
            message: [
                {
                    "to": users[0]._id,
                    "data": `Hi, I'm fine. How are you ${users[0].username}?`,
                    "sent_at": new Date(2024, 0, 1, 10, 30, 20)
                }
            ]
        },
        {
            userId: users[2]._id,
            message: [
                {
                    "to": users[3]._id,
                    "data": `Hi, I'm ${users[2].username}. How are you ${users[3].username}?`,
                    "sent_at": new Date(2024, 0, 1, 10, 30, 0)
                },
                {
                    "to": users[3]._id,
                    "data": "Hi, I'm also fine.",
                    "sent_at": new Date(2024, 0, 1, 10, 30, 30)
                }
            ]
        },
        {
            userId: users[3]._id,
            message: [
                {
                    "to": users[2]._id,
                    "data": `Hi, I'm fine. How are you ${users[2].username}?`,
                    "sent_at": new Date(2024, 0, 1, 10, 30, 20)
                }
            ]
        },
    ]);
    console.log('Insert Many Result:', insertManyResult);

}

initialize_db()