import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function PatientInfo({ show, setPatientInfoShown, patientInfoObj }) {
const {selectedDate, selectedTimeslot, selectedProvider, patientName, patientEmail, setPatientName, setPatientEmail} = patientInfoObj;

const navigate = useNavigate();

  function onInputChange(event, set) {
      set(event.target.value);
  }

  function onSubmitClick() {
    setPatientInfoShown(true);
  }

  function onCancelClick() {
    setPatientInfoShown(false);
  }

  function onHomeClick() {
    navigate('/');
  }

  return (
    <div>
      {
        !show ?
        <div>
          <button id="book-home" type="button" className="sp-button" onClick={onHomeClick}>MAIN</button>
          <button id="book-button" type="button" className="sp-button" onClick={onSubmitClick}>BOOK</button>
        </div>
        :
        <div className="dialog fixed z-50 overflow-x-hidden overflow-y-auto  bg-gray-50 rounded-lg shadow dark:bg-gray-700 border-2 border-blue-500 text-center">
            <div className="relative">
              <div id="patient-name" className="ml-6 mt-6">
                <div id="patient-name-title">Your Full Name*</div>
                  <input className="patient-name-input dg-input" type="text" maxLength="60" placeholder="John Smith" onChange={(event) => {onInputChange(event, setPatientName)}} required />
              </div>
            <div id="patient-email" className="ml-6 mt-6 min-w">
              <div id="patient-email-title">Your Email*</div>
              <input className="patient-email-input dg-input" type="email" maxLength="60" placeholder="example@email.com" onChange={(event) => {onInputChange(event, setPatientEmail)}} required />
            </div>
            <button type="cancel" className="dg-button" onClick={onCancelClick}>CANCEL</button>
            <button id="book-button" type="submit" className="dg-button">FINISH BOOKING</button>

        </div>
      </div>
      }
    </div>

  )


}


