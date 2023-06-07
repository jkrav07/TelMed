import React from 'react';
import PatientApptPage from './PatientApptPage';

export default function StartPage({ setPage }) {
  function buttonOnClick(pageNum) {
    setPage(pageNum);
  }

  return (
    <div id="start-page">
      <button onClick={() => {buttonOnClick(1)}}>Patient</button>
      <button onClick={() => {buttonOnClick(2)}}>Provider</button>
    </div>
  );
}
