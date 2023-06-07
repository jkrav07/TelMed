import React from 'react';
import StartPage from './StartPage';
import ApptPage from './ApptPage'

export default function App() {
  const [page, setPage] = useState(0);
  return (
    <div id="App">
      <div id='title'>Express Med</div>
      {
        page === 0 ? <StartPage setPage={setPage} /> : ''
        page === 1 ? <PatientApptPage setPage={setPage} /> : ''
      }
    </div>
  );
}
