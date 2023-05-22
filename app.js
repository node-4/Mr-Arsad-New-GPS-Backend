const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const user = require('./router/user_router');
const wallet = require('./router/wallet');
const devices = require('./router/device_router')
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req,res) =>{
    res.status(200).json({
        message: "Working"
    })
})
app.use('/api/v1/user',user );
app.use('/api/v1/wallet', wallet);
app.use('/api/v1/device', devices)
app.all('*', (req, res, next) => {
    return next(
        createError(404, 'Path does not exists'));
})
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    if (err.status) {
        console.log(err);
        console.log('error middleware');
        return res.status(err.status).json({
            msg: err.message
        })

    } else {

        console.log(err);
        console.log('error middleware status not given');
        return res.status(500).json({
            msg: err.message
        })
    }

})


module.exports = app;