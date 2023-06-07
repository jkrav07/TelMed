import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Timeslots from './Timeslots';


export default function PatientApptPage(setPage) {
  const [timeslots, setTimeslots] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedTimeslot, setselectedTimeslot] = useState('');
  const [selectedProvider, setSelectedTimeslot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');

  useEffect(() => {
    axios.get('/telmed/timeslots')
      .then(result => {
        setTimeslots(result.data);
      })
      .catch(err => {
        console.error("FAILED TO FETCH TIMESLOTS FROM SERVER:", err.message);
      })
  }, [])

  function onBookClick() {

  };

  return (
    <div id="pt-appt-page">
      <form id="pt-appt-page-form" onSubmit={onBookClick}>
        <div id="pt-calendar"></div>
        <div id="timeslots-list">
          <Timeslots timeslots={timeslots} selectedTimeslot={selectedTimeslot} setSelectedTimeslot={setSelectedTimeslot} />
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
