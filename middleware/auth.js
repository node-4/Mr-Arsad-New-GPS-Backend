const jwt = require("jsonwebtoken");
const User = require('../models/user_model');
const catchAsyncError = require('./AsyncError')
const ErrorHander = require("../utils/errorhander");
exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    try{
    const token = req.get("Authorization")?.split("Bearer ")[1];
    //console.log(token)
  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.SECRET);
  console.log(decodedData)

  req.user = await User.findById(decodedData._id);

  next();
}catch(error){
    return res.status(400).json({
        errorName: error.name,
        errorMessage: error.message

    })
}
})