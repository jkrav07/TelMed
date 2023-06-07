const express = require('express');
const axios = require('axios');
const model = require('./model');


const controllers = {};

controllers.addAppt = async (req, res) => {
  const {date} = req.body;
  const {timeslotId} = req.body;
  const {patientName} = req.body;
  const {patientEmail} = req.body;
  const {providerId} = req.body;
  const {symptoms} = req.body;
  let patientId;

  try {
    let patients = await model.findPatient(patientName, patientEmail);

    if (patients.length === 0) {
      let result = await model.addPatient(patientName, patientEmail)
      console.log('added patient:', result)
      patientId = result[0].patient_id;
      res.status(201);
      console.log('patient was added to database')
    } else if (patients.length === 1) {
      if (patients[0].patient_name !== patientName) {
        res.status(501);
        res.send(`Patient "${patientName}" does not match ${patientEmail}`);
        //console.log(res.send(`Patient "${patientName}" does not match ${patientEmail}`))
      } else {
        patientId = result[0].patient_id;
      }

      await model.addAppt(date, timeslotId, patientId, providerId, symptoms);
      console.log(result);
      res.status(201);
      console.log('appointment was added to database')
    }
  }
  catch (err) {
    console.error('FAILED TO FIND PATIENT IN DB:', err.message);
    res.status(501);
  }
};

controllers.getTimeslots = (req, res) => {
  model.retrieveTimeslots()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.error('FIALED TO GET TIMESLOTS:', err.message)
    })
};

controllers.getProviders = (req, res) => {

};

/*
controllers.getReviews = (req, res) => {
  const productId = req.query.product_id;
  const page = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'relevant';
  model
    .retrieveReviews(productId, page, count, sort)
    .then((result) => {
      const responseData = {
        "product": productId,
        "page": page,
        "count": count,
        "results": result,
      };
      res.send(responseData);
    })
    .catch((err) => {
      console.log('UNABLE TO PROCESS REQUEST', err);
      res.sendStatus(422);
    });
};



controllers.getMetadata = (req, res) => {
  const productId = req.query.product_id;
  model
    .retrieveMetaReviews(productId)
    .then((result) => {
      console.log(result);
      //aasembling the response object from received result from db
      let ratings = {};
      result[0].forEach(rating => {
        ratings[rating.rating] = rating.count
      });

      let recommended = {};
      result[1].forEach(recommend => {
        recommended[recommend.recommend] = recommend.count;
      })

      let characteristics = {};
      result[2].forEach(characteristic => {
        let name = characteristic.characteristic_name;
        characteristics[name] = {};
        characteristics[name].id = characteristic.characteristics_id;
        characteristics[name].value = characteristic.avg;
      })

      const responseData = {
        'product_id': productId,
        'ratings': ratings,
        'recommended': recommended,
        'characteristics': characteristics
      };
      //console.log(responseData);
      res.json(responseData);
    })
    .catch((err) => {
      console.log('UNABLE TO GET METADATA', err);
      res.sendStatus(422);
    });
}


controllers.postReview = (req, res) => {
  const data = {
    product_id: req.body.product_id,
    rating: req.body.rating || 5,
    summary: req.body.summary || '',
    body: req.body.body || '',
    recommend: req.body.recommend || false,
    name: req.body.name || '',
    email: req.body.email || '',
    photos: req.body.photos || [],
    characteristics: req.body.characteristics || {},
  };
  model.postReview(data)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(422);
      console.error('FAILED TO ADD REVIEW:', err)
    })
};


controllers.markReviewHelpful = (req, res) => {
  const reviewId = req.params.review_id;
  model.markReviewHelpful(reviewId)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(422);
      console.error('FAILED TO MARK REVIEW AS HELPFUL')
    })
};

controllers.markReviewReported = (req, res) => {
  const reviewId = req.params.review_id;
  model.markReviewReported(reviewId)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(422);
      console.error('FAILED TO MARK REVIEW AS REPORTED')
    })
}

*/
module.exports = controllers;