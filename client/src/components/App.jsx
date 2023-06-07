import React, { useState } from 'react';
import StartPage from './StartPage';
import PatientApptPage from './PatientApptPage';

export default function App() {
  const [page, setPage] = useState(0);

  return (
    <div id="App">
      <div id='title'>Express Med</div>
      <div>
      {
        page === 0 ? <StartPage setPage={setPage} /> : ''
      }
      </div>
      <div>
      {
        page === 1 ? <PatientApptPage setPage={setPage} /> : ''
      }
      </div>
    </div>
  );
}
