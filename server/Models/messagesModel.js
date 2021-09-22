const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/AsafMedia'
mongoose.connect(mongoURL, {})
.then(() => console.log(`connected to mongo on ${mongoURL}`))
.catch(err => console.error(err));


const messagesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('messages', messagesSchema);
