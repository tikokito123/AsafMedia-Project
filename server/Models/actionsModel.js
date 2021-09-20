const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL = process.env.mongoURL || 'mongodb://localhost:27017/AsafMedia'
mongoose.connect(mongoURL, {})
.then(() => console.log(`connected to mongo on ${mongoURL}`))
.catch(err => console.error(err));


const actionSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true
    },
    action: {
        type: String,
        required: true,
    },
    IP: {
        type: String,
        required: true,
        default: "127.0.0.1"//req.connection.remoteAddress
    }
});


module.exports = mongoose.model('Actions', actionSchema);
