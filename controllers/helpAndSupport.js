const helpandSupport = require("../models/helpAndSupport");
exports.AddQuery = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const Data = await helpandSupport.create(req.body);
        res.status(200).json({ message: Data, });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message,
        });
    }
};
exports.getAllHelpandSupport = async (req, res) => {
    try {
        const data = await helpandSupport.find().populate('user');;
        if (data.length == 0) {
            res.status(404).send({ status: 404, message: "help and support Not found", data: {} });
        } else {
            res.status(200).send({ status: 200, message: "help and support found successfully.", data: data });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({
            message: err.message,
        });
    }
};
exports.getAllHelpandSupportgetById = async (req, res) => {
    try {
        const data = await helpandSupport.findById(req.params.id).populate('user');
        if (!data) {
            res.status(404).send({ status: 404, message: "help and support Not found", data: {} });
        } else {
            res.status(200).send({ status: 200, message: "help and support found successfully.", data: data });
        }
    } catch (err) {
        console.log(err);
        res.status(200).json({ message: err.message, });
    }
};
exports.DeleteHelpandSupport = async (req, res) => {
    try {
        const data = await helpandSupport.findById(req.params.id).populate('user');
        if (!data) {
            res.status(404).send({ status: 404, message: "help and support Not found", data: {} });
        } else {
            await helpandSupport.findByIdAndDelete({ _id: data._id }).populate('user');;
            res.status(200).send({ status: 200, message: "help and support found successfully.", data: data });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message, });
    }
};