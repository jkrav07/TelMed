import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientApptPage from './PatientApptPage';

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div id="start-page">
      <button className="sp-button" onClick={() => {navigate('/PatientApptPage')}}>Patient</button>
      <button className="sp-button" onClick={() => {navigate('/ProviderLoginPage')}}>Provider</button>
    </div>
  );
}
