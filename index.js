const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const compression = require("compression");
const serverless = require("serverless-http");
const app = express();
app.use(compression({ threshold: 500 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
if (process.env.NODE_ENV == "production") {
    console.log = function () { };
}
app.get("/", (req, res) => {
    res.send("Hello World!");
});
const user = require('./router/user_router');
const wallet = require('./router/wallet');
const devices = require('./router/device_router')
const adminRoutes = require('./router/adminRoutes')
const static = require('./router/static.route')
const subscription = require('./router/subscription');
const rideType = require('./router/rideType')
app.use('/api/v1/user', user);
app.use('/api/v1/wallet', wallet);
app.use('/api/v1/device', devices)
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/static', static);
app.use('/api/v1/subscription', subscription);
app.use('/api/v1/rideType', rideType);
app.use("/api/v1/Faq", require('./router/faq'))
app.use("/api/v1/help", require('./router/helpAndSupport'))
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);

mongoose.connect("mongodb+srv://gpstracker:gpstracker@gps.l8lbcy8.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if (!err) {
        console.log("MongoDB Connection Succeeded.");
    } else {
        console.log("Error in DB connection: " + err);
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = { handler: serverless(app) }