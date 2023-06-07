const express = require('express');
const router = express.Router();

const controllers = require('./controllers');


router.get('/timeslots', controllers.getTimeslots);

router.get('/providers', controllers.getProviders);

router.post('/appt', controllers.addAppt);

//router.put('/:review_id/helpful', controllers.)

//router.put('/:review_id/report', controllers.markReviewReported)



module.exports = router;