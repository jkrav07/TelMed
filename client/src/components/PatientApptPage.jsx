import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Timeslots from './Timeslots';
import Providers from './Providers';


export default function PatientApptPage(setPage) {
  const [timeslots, setTimeslots] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedDate, onSelectedDateChange] = useState(new Date());

  console.log(selectedDate);

  useEffect(() => {
    axios.get('/telmed/timeslots')
      .then(result => {
        setTimeslots(result.data);
        console.log('timeslots after initial GET:', timeslots);
      })
      .catch(err => {
        console.error("FAILED TO FETCH TIMESLOTS FROM SERVER:", err.message);
      })
  }, [])

  useEffect(() => {
    axios.get(`/telmed/providers?date=${selectedDate.toISOString()}&timeslot=${selectedTimeslot}`)
      .then(result => {
        setProviders(result.data);
      })
      .catch(err => {
        console.error("FAILED TO FETCH PROVIDERS FROM SERVER:", err.message);
      })
  }, [selectedTimeslot])

  function onBookClick() {

  };

  function onInputChange(event, set) {
    set(event.target.value);
  }

  return (
    <div id="patient-appt-page">
      <form id="patient-appt-page-form" onSubmit={onBookClick}>

        <div id="patient-calendar">
          <Calendar onChange={onSelectedDateChange} value={selectedDate} />
        </div>

        <div id="timeslots-list">
          <Timeslots timeslots={timeslots} selectedTimeslot={selectedTimeslot} setSelectedTimeslot={setSelectedTimeslot} />
        </div>

        <div id="providers-list">
          <Providers selectedDate={selectedDate} selectedTimeslot={selectedTimeslot} setSelectedProvider={setSelectedProvider} />
        </div>

        <div id="patient-name">
          <div id="patient-name-title">Your Full Name*</div>
            <input className="patient-name-input" type="text" maxLength="60" placeholder="John Smith" onChange={(event) => {onInputChange(event, setPatientName)}} required />
        </div>

        <div id="patient-email">
          <div id="patient-email-title">Your Email*</div>
          <input className="patient-email-input" type="email" maxLength="60" placeholder="example@email.com" onChange={(event) => {onInputChange(event, setPatientEmail)}} required />
        </div>

        <button id="book-button">Book</button>

      </form>
    </div>
  );
}
