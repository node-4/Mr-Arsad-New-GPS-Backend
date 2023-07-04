const mongoose = require('mongoose');
const helpandSupport = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String
    }, 
    mobile: {
        type: String
    }, 
    query: {
        type: String
    }
})
const help = mongoose.model('help&support', helpandSupport);
module.exports = help