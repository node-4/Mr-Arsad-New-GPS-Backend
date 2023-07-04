const Admin = require("../models/adminModel");
const User = require("../models/user_model");
const device = require("../models/device_model");
const transaction = require('../models/transactionModel')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
exports.createUser = async (req, res) => {
        try {
                const { name, email, password } = req.body;
                if ((email != (null || undefined)) && (password != (null || undefined))) {
                        const salt = await bcrypt.genSalt(10);
                        const hashedPassword = await bcrypt.hash(password, salt);
                        const newAdmin = new Admin({ name, email, password: hashedPassword });
                        const savedAdmin = await newAdmin.save();
                        return res.status(200).json({ message: "Admin Create Successfully.", data: savedAdmin })
                } else {
                        return res.status(201).json({ message: "Email and password not empty.", data: {} })
                }
        } catch (err) {
                console.log(err)
                res.status(400).json({ message: err.message });
        }
}
exports.login = async (req, res) => {
        try {
                const { email, password } = req.body;
                const user = await Admin.findOne({ email: email });
                if (!user) { return res.status(401).json({ error: "Invalid email or password" }); }
                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if (!passwordIsValid) {
                        return res.status(401).send({ message: "Wrong password", });
                }
                const accessToken = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: "1d", });
                return res.status(200).json({ user, accessToken });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.getProfile = async (req, res) => {
        try {
                const user = await Admin.findById({ _id: req.user._id });
                if (!user) {
                        return res.status(404).json({ status: 404, message: "User not found" });
                }
                return res.status(200).json({ status: 200, message: "user found.", data: user, });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.getUsers = async (req, res) => {
        try {
                const user = await User.find({}).select('-password');
                if (user.length == 0) {
                        return res.status(404).json({ status: 404, message: "User not found" });
                }
                return res.status(200).json({ status: 200, message: "user found.", data: user, });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.getUserById = async (req, res) => {
        try {
                const user = await User.findById({ _id: req.params.id }).select('-password');
                if (!user) {
                        return res.status(404).json({ status: 404, message: "User not found" });
                }
                return res.status(200).json({ status: 200, message: "user found.", data: user, });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.deleteUser = async (req, res) => {
        try {
                const user = await User.findByIdAndDelete(req.params.id);
                if (!user) {
                        return res.status(404).json({ error: "User not found" });
                } else {
                        const users = await device.findOneAndDelete({ userId: user._id });
                        if (users) {
                                return res.status(200).json({ message: "User deleted successfully" });
                        }
                }
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.changePassword = async (req, res) => {
        try {
                const { oldPassword, newPassword, confirmPassword } = req.body;
                const admin = await Admin.findById({ _id: req.user._id });
                if (!admin) {
                        return res.status(404).json({ status: 404, message: "Admin not found" });
                } else {
                        const passwordIsValid = bcrypt.compareSync(oldPassword, admin.password);
                        if (!passwordIsValid) {
                                return res.status(201).send({ status: 201, message: "old Password is inCorrect!", });
                        }
                        if (newPassword == confirmPassword) {
                                const salt = await bcrypt.genSalt(10);
                                const hashedPassword = await bcrypt.hash(newPassword, salt);
                                let update = await Admin.findByIdAndUpdate({ _id: admin._id }, { $set: { password: hashedPassword } }, { new: true });
                                if (update) {
                                        return res.status(200).send({ status: 200, message: "Password Changed successfully", data: update });
                                }
                        } else {
                                return res.status(203).send({ status: 203, message: "New Password and old password not matched!", });
                        }
                }
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
}
exports.updateProfile = async (req, res) => {
        try {
                const { name, email, password } = req.body;
                const admin = await Admin.findById({ _id: req.user._id });
                if (!admin) {
                        return res.status(404).json({ status: 404, message: "Admin not found" });
                } else {
                        let hashedPassword;
                        if (password != (null || undefined)) {
                                const salt = await bcrypt.genSalt(10);
                                hashedPassword = await bcrypt.hash(password, salt);
                        }
                        let obj = {
                                name: name || admin.name,
                                email: email || admin.email,
                                password: hashedPassword || admin.password,
                        }
                        let update = await Admin.findByIdAndUpdate({ _id: admin._id }, { $set: obj }, { new: true })
                        if (update) {
                                return res.status(200).json({ status: 200, message: "Admin Profile update" });
                        }
                }
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
}
exports.getDevice = async (req, res) => {
        try {
                const user = await device.find({}).populate({ path: 'userId', select: '-password' })
                if (user.length == 0) {
                        return res.status(404).json({ status: 404, message: "Device not found" });
                }
                return res.status(200).json({ status: 200, message: "user found.", data: user, });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.getDeviceById = async (req, res) => {
        try {
                const user = await device.findById({ _id: req.params.id }).populate({ path: 'userId', select: '-password' })
                if (!user) {
                        return res.status(404).json({ status: 404, message: "device not found" });
                }
                return res.status(200).json({ status: 200, message: "device found.", data: user, });
        } catch (err) {
                return res.status(500).json({ error: err.message });
        }
}
exports.allTransactionUser = async (req, res) => {
        try {
                const data = await transaction.find({});
                res.status(200).json({ data: data });
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
};
exports.allcreditTransactionUser = async (req, res) => {
        try {
                const data = await transaction.find({ type: "Credit" });
                res.status(200).json({ data: data });
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
};
exports.allDebitTransactionUser = async (req, res) => {
        try {
                const data = await transaction.find({ type: "Debit" });
                res.status(200).json({ data: data });
        } catch (err) {
                res.status(400).json({ message: err.message });
        }
};