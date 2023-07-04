const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const Employee_OwnerSchema = mongoose.Schema(
        {
                name: { type: String, default: "" },
                email: { type: String, default: "" },
                password: { type: String, default: "" },
                phone: { type: String, default: "" },
                otp: { type: String, default: "", },
                otpVerification: { type: Boolean, default: false, },
                otpExpire: { type: Date, },
        },
        { timestamps: true, }
);

module.exports = mongoose.model("admin", Employee_OwnerSchema);
