const otpGenerator = require("otp-generators");
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("../middleware/AsyncError");
const Wallet = require("../models/wallet");

exports.sendOtp = catchAsyncErrors(async (req, res) => {
    try {
        const phone = req.body.phone;
        if (req.body.phone) {
            const user = await User.findOne({ mobile: req.body.phone });
            if (user) {
                return res.status(200).json({
                    otp: user.otp,
                });
            }
            if (!user) {
                const otp = otpGenerator.generate(4, {
                    alphabets: false,
                    upperCase: false,
                    specialChar: false,
                });
                const data = {
                    mobile: phone,
                    otp: otp,
                };
                const userData = await User.create(data);
                const wall = await Wallet.find({ user: userData._id });
                const w = await Wallet.create({ user: userData._id });
                return res.status(200).json({
                    otp: userData.otp,
                    // wallet : w ,
                    // rewands : turbon.point
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.VerifyOtp = catchAsyncErrors(async (req, res) => {
    try {
        if (!req.body.otp) {
            return res.status(500).json({
                message: "Please provide OTP",
            });
        }
        const user = await User.findOne({ otp: req.body.otp });
        if (!user || user.length == 0) {
            return res.status(501).json({
                message: "Invalid Otp",
            });
        } else {
            const token = jwt.sign({ phone: user._id }, process.env.SECRET);
            console.log(token);
            res.status(200).json({
                userId: user._id,
                token: token,
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.SignIn = catchAsyncErrors(async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(500).json({message: "Please provide email" });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(501).json({ message: "Invalid or Email is not register "});
        }
        if (!user.password) {
            return res.status(401).json({message: "Update Password before Login ",});
        }
        const isPasswordValid = bcrypt.hashSync(
            req.body.password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(402).json({
                message: "Password not Match",
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        console.log(token);
        res.status(200).json({
            userId: user._id,
            token: token,
        });
    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.UpdateProfile = catchAsyncErrors(async (req, res) => {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
        return res.status(500).json({
            message: "Email is already registered ",
        });
    } else {
        const data = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, 8),
                address: req.body.address,
            },
            { new: true }
        );
        console.log(data);
        res.status(200).json({
            sucess: true,
            message: "Your Profile Updated",
        });
    }
});

exports.DeleteByUserId = catchAsyncErrors(async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.user });
        res.status(200).json({
            message: "Profile is Deleted ",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.DeleteByUserIdAdmin = catchAsyncErrors(async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.user });
        res.status(200).json({
            message: "Profile is Deleted ",
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.GetAllUser = catchAsyncErrors(async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json({
            sucess: true,
            details: data,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
});

exports.getUserById = catchAsyncErrors(async (req, res) => {
    try {
        // if(!req.params.id){
        //     return res.status(501).json({
        //         message: "UserId is required"
        //     })
        // }
        const data = await User.findById({ _id: req.user._id });
        if (!data) {
            return res.status(500).json({
                message: "User not Found ",
            });
        } else {
            res.status(200).json({
                message: data,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
});
