import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Timeslots from './Timeslots';
import Providers from './Providers';
import PatientInfo from './PatientInfo';


export default function PatientApptPage(setPage) {
  const [patientInfoShown, setPatientInfoShown] = useState(false);
  const [timeslots, setTimeslots] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [selectedDate, onSelectedDateChange] = useState(new Date());

  const patientInfoObj = {
    selectedDate,
    selectedTimeslot,
    selectedProvider,
    patientName,
    patientEmail,
    setPatientName,
    setPatientEmail
  }

  useEffect(() => {
    axios.get('/telmed/timeslots')
      .then(result => {
        setTimeslots(result.data);
        setSelectedTimeslot(result.data[0].timeslot_id);
        console.log('timeslots after initial GET:', timeslots);
      })
      .catch(err => {
        console.error("FAILED TO FETCH TIMESLOTS FROM SERVER:", err.message);
      })
  }, [])

  useEffect(() => {
    axios.get(`/telmed/providers?date=${selectedDate.toISOString()}&timeslot=${selectedTimeslot}`)
      .then(result => {
        console.log('doctors:', result.data);
        setProviders(result.data);
      })
      .catch(err => {
        console.error("FAILED TO FETCH PROVIDERS FROM SERVER:", err.message);
      })
  }, [selectedTimeslot, selectedDate])

  function onFinishSubmitClick(event) {
    event.preventDefault();
    setPatientInfoShown(false);
    const apptInfo = {
      date: selectedDate,
      timeslotId: selectedTimeslot * 1,
      providerId : selectedProvider.provider_id ,
      patientName,
      patientEmail
    }
    console.log('posting:', apptInfo);
    axios.post('/telmed/appt', apptInfo)
      .then(result => {
        console.log('APPT ADDED');
      })
      .catch(err => {
        console.error(err.message);
      })
  }

  function onInputChange(event, set) {
    set(event.target.value);
  }

  return (
    <div id="patient-appt-page">
      <div>Book Your Appointment</div>
      <form id="patient-appt-page-form" onSubmit={(e) => onFinishSubmitClick(e)}>

        <div className="booking-info">
          <div id="patient-calendar">
            <Calendar onChange={onSelectedDateChange} value={selectedDate} />
          </div>

          <div className="boking-time-providers"></div>
          <div id="timeslots-list">
            <Timeslots timeslots={timeslots} selectedTimeslot={selectedTimeslot} setSelectedTimeslot={setSelectedTimeslot} />
          </div>

          <div id="providers-list">
            <Providers setSelectedProvider={setSelectedProvider} providers={providers}/>
          </div>
        </div>

        <PatientInfo show={patientInfoShown} setPatientInfoShown={setPatientInfoShown} patientInfoObj={patientInfoObj}/>

      </form>
    </div>
  );
}
