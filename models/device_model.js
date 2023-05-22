const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
    email: {
        type: String,
        unique: false
    }, 
    userId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
   deviceId : {
    type: String,
    unique: true
   },
   imeiNumber : {
    type: String,
    unique: true
   }
})

module.exports = mongoose.model('deviced', DeviceSchema);
