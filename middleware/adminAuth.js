const jwt = require("jsonwebtoken");
const User = require("../models/adminModel");
const catchAsyncError = require("./AsyncError");
const ErrorHander = require("../utils/errorhander");
exports.verifyToken = catchAsyncError(async (req, res, next) => {
    try {
        const token = req.get("Authorization")?.split("Bearer ")[1];
        //console.log(token)
        if (!token) {
            return next(
                new ErrorHander("Please Login to access this resource", 401)
            );
        }
        const decodedData = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        return res.status(400).json({
            errorName: error.name,
            errorMessage: error.message,
        });
    }
});
