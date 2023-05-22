const express = require('express');
const device_Controllers = require('../controllers/device_controllers');

const router = express();

router.post('/add', device_Controllers.AddDevice);
router.get('/', device_Controllers.GetAllDevices);
router.get('/all', device_Controllers.getDevices)
router.get('/imei/:imei', device_Controllers.GetByIMEINumber);
router.get('/userId/:userId', device_Controllers.getByUserId);
router.delete('/:id', device_Controllers.deleteDevice);
router.get('/:id', device_Controllers.getDeviceById);
router.put('/:id', device_Controllers.updateDevice);





module.exports = router;