import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function PatientInfo({ show, setPatientInfoShown, patientInfoObj }) {
const {selectedDate, selectedTimeslot, selectedProvider, patientName, patientEmail, setPatientName, setPatientEmail} = patientInfoObj


  function onInputChange(event, set) {
      set(event.target.value);
  }

  function onSubmitClick() {
    setPatientInfoShown(true);
  }

  function onCancelClick() {
    setPatientInfoShown(false);
  }

  return (
    <div>
      {
        !show ?
        <button id="book-button" type="button" className="rounded-full" onClick={onSubmitClick}>BOOK</button>
        :

        <div className="patient-info">

          <div id="patient-name">
            <div id="patient-name-title">Your Full Name*</div>
              <input className="patient-name-input" type="text" maxLength="60" placeholder="John Smith" onChange={(event) => {onInputChange(event, setPatientName)}} required />
          </div>

          <div id="patient-email">
            <div id="patient-email-title">Your Email*</div>
            <input className="patient-email-input" type="email" maxLength="60" placeholder="example@email.com" onChange={(event) => {onInputChange(event, setPatientEmail)}} required />
          </div>

          <button type="cancel" onClick={onCancelClick}>CANCEL</button>
          <button id="book-button" type="submit" className="rounded-full">FINISH BOOKING</button>

        </div>
      }
    </div>

  )


}


