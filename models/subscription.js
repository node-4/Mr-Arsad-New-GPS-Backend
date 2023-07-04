const mongoose = require("mongoose");
const objectid = mongoose.Schema.Types.ObjectId;
const subscriptionSchema = mongoose.Schema(
  {
    plan: {
      type: String,
    },
    time: {
      type: String,
    },
    description: {
      type: String,
    },
    validity: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subscription", subscriptionSchema);




