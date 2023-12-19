const bcrypt = require('bcryptjs')
const axios = require('axios')
const Device = require('../models/device_model');

exports.AddDevice = async (req, res) => {
  try {

    if (!req.body.email && req.body.userId) {
      return res.status(400).json({
        message: "Email is Required for Add Device "
      })
    }
    const data = {
      email: req.body.email,
      userId: req.body.userId,
      deviceId: req.body.deviceId,
      imeiNumber: req.body.imeiNumber

    }
    const result = await Device.create(data);
    res.status(200).json({
      message: "ok",
      result: result
    })

  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message
    })
  }
}

// Get all devices
exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find().populate('userId');
    res.status(200).json({ data: devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single device by id
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id).populate('userId');
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({ data: device });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a device
exports.updateDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('userId');
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({ message: 'Device updated successfully!', data: device });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id).populate('userId');
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({ message: 'Device deleted successfully!', data: device });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//Get Devies ByUSerId 
exports.getByUserId = async (req, res) => {
  try {
    const result = await Device.find({ userId: req.params.userId }).populate('userId')
    res.status(200).json({
      message: "ok",
      result: result
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Device get By IMEi Number 
exports.GetByIMEINumber = async (req, res) => {
  try {
    console.log(req.params.imei)
    const data = await Device.findOne({ imeiNumber: req.params.imei });
    if (!data) {
      return res.status(400).json({
        message: "IMEI Number Not Found "
      })
    }
    const result = await axios.get(`https://pullapi-s2.track360.co.in/api/v1/auth/pull_api?username=9990204865&password=Admin@1234&deviceImei=${data.imeiNumber}`);
    res.status(200).json({
      message: "Ok",
      result: result.data
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

exports.GetAllDevices = async (req, res) => {
  try {
    const result = await axios.get("https://pullapi-s2.track360.co.in/api/v1/auth/pull_api?username=9990204865&password=Admin@1234");
    res.status(200).json({
      message: "ok",
      Devices: result.data
    })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}