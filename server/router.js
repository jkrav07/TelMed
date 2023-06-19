const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/timeslots', controllers.getTimeslots);

router.get('/providers', controllers.getProviders);

router.post('/appt', controllers.addAppt);

router.get('/providerPage/:email', controllers.getProviderInfo);

router.delete('/providerPage/:apptId', controllers.cancelAppt)



module.exports = router;