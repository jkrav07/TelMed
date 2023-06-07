import React, {useState, useEffect} from 'react';
import axios from 'axios';


export default function PatientApptPage(setPage) {
  const [timeslots, setTimeslots] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedTimeslot, setselectedTimeslot] = useState('');
  const [selectedProvider, setSelectedTimeslot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');



  return (
    <div id="pt-appt-page">
      <form id="pt-appt-page-form" onSubmit={onBookClick}>
        <div id="pt-calendar"></div>
        <div id="timeslots-list">
          <Timeslots timeslots={timeslots} />
        </div>
        <div id="providers-list">
          <Providers providers={providers} />
        </div>
        <div id="patient-name"></div>
        <div id="patient-email"></div>
        <button id="book-button">Book</button>
      </form>

    </div>
  );
}
