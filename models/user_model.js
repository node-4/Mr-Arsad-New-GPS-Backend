const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: false,
  },
  password: {
    type: String
  },
  address: {
    type: String
  },
  email: {
    type: String,
    require: false,
  },
  mobile: {
    type: String,
    require: false
  },
  image: {
    type: String,
    require: false
  },
  otp: {
    type: String,
    require: false,
  },
  referStatus: {
    type: String,
    default: "unused",
    enum: ["used", "unused"],
  },
  referCode: {
    type: String,
  },
});
function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
userSchema.pre("save", function (next) {
  const refer = generateOTP() + this.otp
  this.referCode = refer;
  console.log("generated referal Code!");
  next();
});
const User = mongoose.model('user', userSchema);
module.exports = User