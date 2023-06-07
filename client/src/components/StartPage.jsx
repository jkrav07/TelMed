import React from 'react';

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
