import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './StartPage';
import PatientApptPage from './PatientApptPage';
import ProviderLoginPage from './ProviderLoginPage';
import ProviderRegisterPage from './ProviderRegisterPage';
import ProviderPage from './ProviderPage';

export default function App() {

  return (
    <BrowserRouter>
      <div id="app">
        <div className="header">
          <div id='title' className="">Express Med</div>
          <img className="logo" src='https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg?s=612x612&w=0&k=20&c=sus8vhG3c__vCdvOBLDhuf2vPUgIAudIAeUBApU_7Ew=' />
        </div>

        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/PatientApptPage" element={<PatientApptPage />} />
          <Route path="/ProviderLoginPage" element={<ProviderLoginPage />} />
          <Route path="/ProviderRegisterPage" element={<ProviderRegisterPage />} />
          <Route path="/ProviderPage" element={<ProviderPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
