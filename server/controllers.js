const express = require('express');
const axios = require('axios');
const model = require('./model');
const sendEmail = require('../client/src/Sendgrid');
var convertTime = require('convert-time');



const controllers = {};

controllers.addAppt = async (req, res) => {
  const {date} = req.body;
  const {timeslotId} = req.body;
  const {patientName} = req.body;
  const {patientEmail} = req.body;
  const {providerId} = req.body;
  const symptoms = req.body.symptoms || 'n/a';
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
        console.log("patien email already exists for names:", {patientName, p: patients[0].patient_name});
        res.status(501);
        res.send(`Patient "${patientName}" does not match ${patientEmail}`);
//console.log(res.send(`Patient "${patientName}" does not match ${patientEmail}`))
      } else {
        patientId = patients[0].patient_id;
      }
    }
    let apt = await model.addAppt(date, timeslotId, patientId, providerId, symptoms);
console.log('appointment was added to database', apt);


    let provider = await model.findProviderName(providerId);
    let timeslot = await model.findTimeslotName(timeslotId);
    let providerName = provider[0].provider_name;
    let startTime = convertTime(timeslot[0].starttime);
    let endTime = convertTime(timeslot[0].endtime);
    let emailDate = new Date(date.slice(0, 10)).toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });



    let body = `Hello ${patientName}!
    You have booked a telemedicine appointment with ${providerName} on ${emailDate} from ${startTime}-${endTime}.
    We look forward to seeing you!`
    let messageObj = {
      to: 'j.krav07@gmail.com',
      from: 'j.krav07@gmail.com',
      subject: 'ExpressMed Appointment Booked',
      text: body,
      html: `<strong>${body}</strong>`,
    }
    sendEmail.sendEmail(messageObj);

    res.status(201).send(apt);;
  }
  catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).send(err.message);
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
  const date = req.query.date;
  const timeslotId = req.query.timeslot;
  console.log('req qury:', req.query);
  model.retrieveProviders(date, timeslotId*1)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error('FIALED TO GET PROVIDERS:', err.message)
    })
};

controllers.getProviderInfo = (req, res) => {
  const providerEmail = req.params.email;
  console.log('providerEmail', providerEmail)
  model.retrieiveProviderInfo(providerEmail)
    .then(result => {
      console.log('Provider INFO from DB', result);
      res.send(result);
    })
    .catch(err => {
      console.error('FIALED TO GET PROVIDER INFO:', err.message)
    })
};

controllers.cancelAppt = async (req, res) => {
  const apptId = req.params.apptId;
//  console.log('apptId', apptId);

  try {
    let apptInfo = await model.fetchApptInfo(apptId);
//console.log('apptInfo', apptInfo);
    if (apptInfo.length > 0) {
      await model.removeAppt(apptId);
      //Email notification to patient
// console.log('provider_name', apptInfo[0].provider_name);
      let providerName = apptInfo[0].provider_name;
// console.log('providername', providerName)
      let startTime = convertTime(apptInfo[0].starttime);
// console.log('startTime', startTime)
      let endTime = convertTime(apptInfo[0].endtime);
      let emailDate = new Date(apptInfo[0].appointment_date.toString().slice(0, 10)).toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });
// console.log('emailDate', emailDate)
      let patientName = apptInfo[0].patient_name;
      let patientEmail = apptInfo[0].patient_email;
// console.log('patientName', patientName)
      let body = `Hello ${patientName}!
      We sincerely apologize, but your telemedicine appointment with ${providerName} on ${emailDate} from ${startTime}-${endTime} has been canceled. Please feel free to book a different appointment.`
      let messageObj = {
        to: patientEmail,
        from: process.env.EMAIL,
        subject: 'ExpressMed Appointment Canceled',
        text: body,
        html: `<strong>${body}</strong>`,
      }
      sendEmail.sendEmail(messageObj);

    }

    res.sendStatus(200);
  }
  catch (err) {
    console.error('SERVER ERROR - FAILED TO CANCEL APPT', err.message);
  }
}

module.exports = controllers;