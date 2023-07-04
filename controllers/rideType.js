const rideType = require("../models/rideType");
exports.getAllRideType = async (req, res) => {
  try {
    const findRideType = await rideType.find();
    if (findRideType.length == 0) {
      res.status(404).send({ status: 404, message: "RideType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "RideType found successfully.", data: findRideType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.createRideType = async (req, res) => {
  try {
    let findRideType = await rideType.findOne({ plan: req.body.plan });
    if (findRideType) {
      res.status(409).send({ status: 409, message: "RideType Already exit", data: {} });
    } else {
      const newRideType = await rideType.create(req.body);
      res.status(200).send({ status: 200, message: "RideType Create successfully.", data: newRideType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.getRideTypeById = async (req, res) => {
  try {
    const findRideType = await rideType.findById(req.params.id);
    if (!findRideType) {
      res.status(404).send({ status: 404, message: "RideType Not found", data: {} });
    } else {
      res.status(200).send({ status: 200, message: "RideType found successfully.", data: findRideType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.updateRideType = async (req, res) => {
  try {
    const findRideType = await rideType.findById(req.params.id);
    if (!findRideType) {
      res.status(404).send({ status: 404, message: "RideType Not found", data: {} });
    } else {
      let obj = {
        rideType: req.body.rideType || findRideType.rideType,
        time: req.body.time || findRideType.time,
        distance: req.body.distance || findRideType.distance,
        price: req.body.price || findRideType.price,
      }
      const updatedRideType = await rideType.findByIdAndUpdate(findRideType._id, obj, { new: true });
      res.status(200).send({ status: 200, message: "RideType update successfully.", data: updatedRideType });
    }
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
exports.deleteRideType = async (req, res) => {
  try {
    const findRideType = await rideType.findByIdAndDelete(req.params.id);
    if (!findRideType) {
      res.status(404).send({ status: 404, message: "RideType Not found", data: {} });
    }
    res.status(200).send({ status: 200, message: "RideType deleted successfully.", data: {} });
  } catch (error) {
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};
