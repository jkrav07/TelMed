import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import convertTime from 'convert-time';


export default function ProviderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  //const email='j.krav07@gmail.com'
  const {email} = location.state;

  const [providerAppts, setProviderAppts] = useState([]);
  const [providerName, setProviderName] = useState('');
  const [providerPhoto, setProviderPhoto] = useState('');
  const [apptCounter, setApptCounter] = useState(0);

  function onHomeClick() {
    navigate('/');
  }

  useEffect(() => {
    axios.get(`/telmed/providerPage/${email}`)
      .then(result => {
        console.log('providerAppts',result.data);
        setProviderAppts(result.data);
        if (result.data.length) {setProviderPhoto(result.data[0].provider_photo || './assets/_MG_0171.jpg')};
        if (result.data.length) {setProviderName(result.data[0].provider_name)};

      })
      .catch(err => {
        console.error("FAILED TO FETCH PROVIDER APPTS FROM SERVER:", err.message);
      })
  }, [apptCounter])

  return (
    <div className="o1">
      <div className="pb-3 mt-6 font-extrabold antialiased text-3xl">{providerName}</div>

      <div className="a1">
        <img className="p1" src={providerPhoto} />
        <div className="a3">
          {providerAppts.map(appt => {
            return <ProviderAppt appt={appt} apptCounter={apptCounter} setApptCounter={setApptCounter} />
          })}
        </div>
      </div>
      <button type="button" className="dg-button -ml-2.5" onClick={onHomeClick}>SIGN OUT</button>
    </div>
  )
};

function ProviderAppt( {appt, apptCounter, setApptCounter} ) {
  const startTime = convertTime(appt.starttime);
  const endTime = convertTime(appt.endtime);
  const date = new Date(appt.appointment_date.slice(0, 10)).toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' });

  function onCancelClick() {
    const apptId = appt.appointment_id;
    axios.delete(`/telmed/providerPage/${apptId}`)
      .then(() => {
        setApptCounter(apptCounter + 1);
      })
      .catch(err => {
        console.error('FAILED TO CANCEL APPT', err.message);
      })

  }

  return (
    <div className="b">
      <div className="b1">
        <div>{date}</div>
        <div>{`${startTime} - ${endTime}`}</div>
      </div>
      <div className="b2">
        <div>{appt.patient_name}</div>
        <div>{appt.symptoms}</div>
        <button id="cancel" type="button" className="dg-button" onClick={onCancelClick}>CANCEL</button>
      </div>

    </div>
  )
};



