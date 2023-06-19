import React, {useState, useEffect} from 'react';
import axios from 'axios';
import convertTime from 'convert-time';


export default function Timeslots({ timeslots, selectedTimeslot, setSelectedTimeslot }) {

  function onTimeslotChange(event) {
    setSelectedTimeslot(event.target.value);
  }

  return (
    <div id="timeslots">
      <select className="timeslotsDropdown" onChange={(event) => {onTimeslotChange(event)}}>
        {
          timeslots.map(timeslot => {
            return <RenderTimeslot timeslot={timeslot} />
          })
        }
      </select>

    </div>
  );
};


function RenderTimeslot( {timeslot} ) {
  const startTime = convertTime(timeslot.starttime);
  const endTime = convertTime(timeslot.endtime);

  return (
      <option value={timeslot.timeslot_id}>
        {startTime}
        {' - '}
        {endTime}
      </option>

  );
};
