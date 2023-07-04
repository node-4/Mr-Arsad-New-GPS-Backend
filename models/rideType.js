const mongoose = require("mongoose");
const rideTypeSchema = mongoose.Schema(
  {
    rideType: {
      type: String,
    },
    time: {
      type: String,
    },
    distance: {
      type: Number,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("rideType", rideTypeSchema);




