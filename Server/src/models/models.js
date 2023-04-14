const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = new Schema({
    chatMsg: { type: String, required: true, unique: false },
    username: { type: String, required: true, unique: false },
  });
  
const chanellSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Message = mongoose.model("Message", messageSchema);
const Chanell = mongoose.model("Chanell", chanellSchema);

module.exports = { Message, Chanell };