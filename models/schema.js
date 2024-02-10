const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true, unique:true, index:true },
  password: { type: String, required: true }
});

const friendsRelationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, index:true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index:true },
    message: [{
        to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index:true },
        data: { type: String, required: true },
        sent_at: { type: Date, required: true }
    }]
});

module.exports = { 
    userCollection: mongoose.model("User", userSchema),
    friendsRelationCollection: mongoose.model("Friends_Relation", friendsRelationSchema),
    messageCollection: mongoose.model("Message", messageSchema) 
}