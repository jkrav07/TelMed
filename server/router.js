const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/timeslots', controllers.getTimeslots);

router.get('/providers', controllers.getProviders);

router.post('/appt', controllers.addAppt);


module.exports = router;